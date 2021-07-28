/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  AcmModal, AcmExpandableCard,
} from '@open-cluster-management/ui-components'
import {
  Text, Spinner, Select, Title,
  SelectOption, SelectVariant, Radio, Alert,
  AlertActionCloseButton
} from '@patternfly/react-core'
import MonacoEditor from 'react-monaco-editor'
import msgs from '../../../nls/platform.properties'
import {
  modifyPolicyAutomation, clearRequestStatus,
  updateModal, copyAnsibleSecret
} from '../../../actions/common'
import { getPolicyCompliantStatus } from '../../../tableDefinitions/utils'
import { Query } from '@apollo/client/react/components'
import {
  GET_ANSIBLE_CREDENTIALS, GET_ANSIBLE_HISTORY,
  GET_ANSIBLE_JOB_TEMPLATE, GET_ANSIBLE_OPERATOR_INSTALLED,
} from '../../../utils/client/queries'
import _ from 'lodash'
import _uniqueId from 'lodash/uniqueId'
import jsYaml from 'js-yaml'
import TitleWithTooltip from '../../common/TitleWithTooltip'
import { renderAnsibleOperatorNotInstalled } from './AnsibleOperatorNotInstalled'
import { renderAnsibleURL } from './AnsibleURL'
import { renderAnsiblePanelContent } from './AnsiblePanelContent'
import { buildModalButtonList } from './AnisbleModalButtonList'
import { renderAnsibleRemovalModal } from './AnsibleRemovalModal'

import '../../../scss/ansible-modal.scss'

const metaNameStr = 'metadata.name'
const metaNSStr = 'metadata.namespace'
const extraVarsStr= 'spec.automationDef.extra_vars'
export class AnsibleAutomationModal extends React.Component {
  constructor(props) {
    super(props)
    const { open } = this.props
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.state = {
      initializeFinished: false,
      policyAutoName: '',
      activeItem: 0,
      credentialName: null,
      towerURL: '-',
      ansibleConnection: null,
      credentialNS: null,
      credentialIsOpen: false,
      jobTemplateName: null,
      jobTemplateIsOpen: false,
      extraVars: null,
      ansScheduleMode: 'disabled',
      queryMsg: {
        msg: '',
        type: '',
      },
      yamlMsg: {
        msg: '',
        type: '',
      },
      initialJSON: null,
      confirmClose: false,
      slideFlag: open,
      notificationOpen: true,
      openDelModal:false,
    }
  }

  componentDidMount() {
    this.initialize()
  }

  buildPolicyAutomationJSON = ({
    policyAutoName, policyAutoNS, policyName, annotations,
    resourceVersion, extraVars, credentialName, jobTemplateName,
    ansScheduleMode
  }) => {
    const {
      credentialName:stateCredentialName,
      jobTemplateName:stateJobTemplateName,
      extraVars:stateExtraVars, ansScheduleMode:stateAnsScheduleMode
    } = this.state
    const modalData =  ansScheduleMode ? ansScheduleMode : stateAnsScheduleMode
    let mode
    switch (modalData) {
      case 'once':
      case 'disabled':
        mode = modalData
      break
      case 'manual':
      default:
        mode = 'disabled'
      break
    }
    const jsonTemp = {
      kind: 'PolicyAutomation',
      apiVersion: 'policy.open-cluster-management.io/v1beta1',
      metadata: {
        name: policyAutoName ? policyAutoName : '',
        namespace: policyAutoNS ? policyAutoNS : '',
      },
      spec: {
        policyRef: policyName ? policyName : '',
        mode,
        automationDef: {
          type: 'AnsibleJob',
          name: jobTemplateName ? jobTemplateName : stateJobTemplateName,
          secret: credentialName ? credentialName : stateCredentialName,
        },
      }
    }
    if (annotations) {
      jsonTemp.metadata.annotations = annotations
    }
    if (resourceVersion) {
      jsonTemp.metadata.resourceVersion = resourceVersion
    }
    if (stateExtraVars || extraVars) {
      _.set(jsonTemp, extraVarsStr, this.yamlToJSON(stateExtraVars || extraVars))
    }
    return jsonTemp
  }

  initialize = async () => {
    const { data } = this.props
    const policyName = _.get(data, metaNameStr)
    const policyAutomation = _.get(data, 'policyAutomation')
    if (policyAutomation) {
      const policyAutoName = _.get(policyAutomation, metaNameStr)
      const policyAutoNS = _.get(policyAutomation, metaNSStr)
      let annotations = _.get(policyAutomation, 'metadata.annotations')
      const resourceVersion = _.get(policyAutomation, 'metadata.resourceVersion')
      const credentialName = _.get(policyAutomation, 'spec.automationDef.secret')
      const jobTemplateName = _.get(policyAutomation, 'spec.automationDef.name')
      const extraVarsJSON = _.get(policyAutomation, extraVarsStr)
      let extraVars = null
      if (typeof extraVarsJSON === 'object' && Object.keys(extraVarsJSON).length > 0) {
        extraVars = this.jsonToYAML(extraVarsJSON)
      }
      let ansScheduleMode = _.get(policyAutomation, 'spec.mode')
      if (annotations && annotations['policy.open-cluster-management.io/rerun'] === 'true') {
        ansScheduleMode = 'manual'
      } else {
        annotations = {'policy.open-cluster-management.io/rerun':'false'}
      }
      const initialJSON = this.buildPolicyAutomationJSON({
        policyAutoName, policyAutoNS, policyName, annotations, resourceVersion,
        extraVars, credentialName, jobTemplateName, ansScheduleMode
      })
      this.setState({
        policyAutoName,
        credentialName,
        jobTemplateName,
        extraVars,
        ansScheduleMode,
        initialJSON
      })
    }
    this.setState({
      initializeFinished: true,
    })
  }

  yamlToJSON = yaml => {
    let resultJSON = null
    if (typeof yaml === 'string') {
      try {
        resultJSON = jsYaml.load(yaml)
      } catch (error) {
        console.error(error)
        this.setState({
          notificationOpen: true,
          yamlMsg: {
            msg: JSON.stringify(error),
            type: 'danger',
          }
        })
      }
    } else if (typeof yaml === 'object') {
      resultJSON = yaml
    }
    return resultJSON
  }

  jsonToYAML = json => {
    let resultYaml = null
    if (typeof json === 'string') {
      resultYaml = json
    } else if (typeof json === 'object') {
      try {
        resultYaml = jsYaml.dump(json)
      } catch (error) {
        console.error(error)
        this.setState({
          notificationOpen: true,
          yamlMsg: {
            msg: JSON.stringify(error),
            type: 'danger',
          }
        })
      }
    }
    return resultYaml
  }

  setQueryAlert = (msg, type) => {
    this.setState({
      queryMsg: {
        msg: msg,
        type: type,
      },
      notificationOpen: true
    })
  }

  handleTabClick = (result, tabIndex) => {
    this.setState({
      activeItem: tabIndex
    })
  }

  getAnsScheduleMode = json => {
    let ansScheduleMode = _.get(json, 'spec.mode')
    ansScheduleMode = ansScheduleMode || 'disabled'
    const annotations = _.get(json, 'metadata.annotations')
    if (annotations && annotations['policy.open-cluster-management.io/rerun'] === 'true') {
      ansScheduleMode = 'manual'
    }
    return ansScheduleMode
  }

  // for delete action in merge-patch+json in grc-ui-api policyAutomationAction
  // we need to keep the removed key and set removed value to null
  removedExtraVars = (initialJSON, latestJSON) => {
    const updatedJSON = latestJSON
    if (initialJSON && latestJSON) {
      const initialExtraVars= _.get(initialJSON, extraVarsStr)
      let latestExtraVars= _.get(latestJSON, extraVarsStr)
      if (initialExtraVars) {
        Object.keys(initialExtraVars).forEach((key) => {
          if(latestExtraVars){
            if (!Object.prototype.hasOwnProperty.call(latestExtraVars, key)) {
              _.set(latestExtraVars, key, null)
            }
          } else {
             latestExtraVars = {}
            _.set(latestExtraVars, key, null)
            }
        })
        _.set(updatedJSON, extraVarsStr, latestExtraVars)
      }
    }
    return updatedJSON
  }

  handleSubmitClick = async (inputAction) => {
    const { yamlMsg, initialJSON } = this.state
    const { locale, refetch } = this.props
    const generateJSONResult = Promise.resolve(this.generateJSON())
    const {latestJSON, action} = await generateJSONResult
    let submitAction = action
    if (typeof inputAction === 'string') {
      submitAction = inputAction
    }
    if (!yamlMsg.msg && latestJSON && submitAction || submitAction === 'delete') {
      const updatedJSON = this.removedExtraVars(initialJSON, latestJSON) || initialJSON
      const {data:resData} = await this.props.handleModifyPolicyAutomation(updatedJSON, submitAction)
      const errors = _.get(resData, 'modifyPolicyAutomation.errors')
      if (Array.isArray(errors) && errors.length > 0)  {
        const error = errors[0]
        if (_.get(error, 'kind') === 'PolicyAutomation' && _.get(error, 'message')) {
          this.setQueryAlert(_.get(error, 'message'), 'danger')
        }
      } else {
        const ansScheduleMode = this.getAnsScheduleMode(updatedJSON)
        this.initialize()
        this.setQueryAlert(msgs.get(`ansible.${ansScheduleMode}.success`, locale), 'success')
        this.handleCloseSlideOut()
        refetch()
      }
    }
  }

  handleDeleteClick = () => {
    this.handleCloseDelModal()
    this.handleSubmitClick('delete')
  }

  handleCloseDelModal = () => {
    this.setState({
      openDelModal: false
    })
  }

  handleOpenDelModal = () => {
    this.setState({
      openDelModal: true
    })
  }

  handleCloseSlideOut = () => {
    const { type:modalType, handleClose } = this.props
    this.setState({
      slideFlag: false
    },() => {
      setTimeout(()=> {
        handleClose(modalType)
      }, 399)
    })
  }

  handleCloseClick = async() => {
    const { queryMsg } = this.state
    const { locale } = this.props
    if (_.get(queryMsg, 'type') === 'success') {
      this.handleCloseSlideOut()
    } else {
      const { initialJSON, confirmClose, credentialName } = this.state
      const generateJSONResult = Promise.resolve(this.generateJSON())
      const { latestJSON } = await generateJSONResult
      if (_.get(latestJSON, 'spec.automationDef.secret')) {
        latestJSON.spec.automationDef.secret = credentialName
      }
      let ifChanged = false
      if (initialJSON && latestJSON && !_.isEqual(initialJSON, latestJSON)) {
        ifChanged = true
        this.setQueryAlert(msgs.get('ansible.unsaved.data', locale), 'warning')
      }
      if (confirmClose || !ifChanged) {
        this.handleCloseSlideOut()
      } else {
        // prevent double-click
        setTimeout(()=> {
          this.setState({
            confirmClose: true
          })
        }, 150)
      }
    }
  }

  generateJSON = async () => {
    let latestJSON, action ='post'
    const {jobTemplateName, credentialName, credentialNS,
      ansScheduleMode, initialJSON
    } = this.state
    const { data:policyData } = this.props
    const policyName = _.get(policyData, metaNameStr)
    const policyNS = _.get(policyData, metaNSStr)
    if (jobTemplateName && credentialName && credentialNS && ansScheduleMode
       && policyName && policyNS) {
      // step to copy secret to target ns
      const secretData = await this.props.handleCopyAnsibleSecret(
        credentialName, credentialNS, policyNS
      )
      const secretName = _.get(secretData, 'data.copyAnsibleSecret.name')
      const secretErrors = _.get(secretData, 'errors')
      if (Array.isArray(secretErrors) && secretErrors.length > 0) {
        this.setQueryAlert(_.get(secretErrors[0], 'message'), 'danger')
      } else if (secretName) {
        const policyAutoName = `${policyName}-policy-automation`
        const policyAutoNS = policyNS
        let annotations = ''
        if (ansScheduleMode === 'manual') {
          annotations = {'policy.open-cluster-management.io/rerun':'true'}
        } else {
          annotations = {'policy.open-cluster-management.io/rerun':'false'}
        }
        let resourceVersion = ''
        if (initialJSON) {
          action = 'patch'
          resourceVersion = _.get(initialJSON, 'metadata.resourceVersion')
        }
        latestJSON = this.buildPolicyAutomationJSON({
          policyAutoName, policyAutoNS, policyName, annotations, resourceVersion,
          extraVars:null, credentialName:secretName, jobTemplateName:null
        })
      }
    }
    return {latestJSON, action}
  }

  getQueryError = error => {
    return _.get(error, 'message') || ''
  }

  closeAlert = () => {
    if (this.state.notificationOpen) {
      this.setState({
        notificationOpen: false
      })
    }
  }

  render() {
    const namespace = _.get(this.props.data, metaNSStr, '')
    return (
      <Query query={GET_ANSIBLE_OPERATOR_INSTALLED} variables={{namespace}}>
        {( result ) => {
          const { loading, error={}, data={} } = result
          const queryError = this.getQueryError(error)
          return this.renderAnsiblePanel(data.ansibleOperatorInstalled?.installed, loading, queryError)
        }}
      </Query>
    )
  }

  renderAnsiblePanel = (opInstalled, opInstalledLoading, opInstalledError) => {
    const { data:policyData, locale, open, onlyEdit } = this.props
    const { activeItem, towerURL, queryMsg, yamlMsg, initialJSON,
      initializeFinished, policyAutoName, slideFlag, notificationOpen,
      credentialName, credentialIsOpen, openDelModal
    } = this.state
    const policyName = _.get(policyData, metaNameStr)
    const policyNS = _.get(policyData, metaNSStr)
    let query, variables, pollInterval, actionClose
    if (!activeItem) { // configuration page
      query = GET_ANSIBLE_CREDENTIALS
      variables = { name: credentialName, namespace: policyNS }
      actionClose = <AlertActionCloseButton onClose={this.closeAlert} />
      pollInterval = 0
    } else { // ansible history page
      query = GET_ANSIBLE_HISTORY
      variables = {name:policyAutoName, namespace:policyNS}
      actionClose = ''
      pollInterval = 10000
    }
    const panelType = initialJSON ? 'edit' : 'create'
    return (
      <div>
        {<Query query={query} pollInterval={pollInterval} variables={variables}>
          {( result ) => {
            const { loading } = result
            const { error={}, data={} } = result
            const queryError = this.getQueryError(error)
            const readyFlag = (initializeFinished && !loading && !opInstalledLoading)
            const modalName = slideFlag ? 'automation-resource-panel slide-in' : 'automation-resource-panel'
            const titleText = readyFlag ? msgs.get(`ansible.automation.heading.${panelType}`, locale) : ''
            const alertTitle = (opInstalledError || queryError || yamlMsg.msg || queryMsg.msg)
            let alertVariant = 'danger'
            if (queryError && _.includes(queryError, 'not installed')) {
              alertVariant = 'info'
            } else if (yamlMsg.type || queryMsg.type){
              alertVariant = (yamlMsg.type || queryMsg.type)
            }
            return (
              <React.Fragment>
                <AcmModal
                className={modalName}
                titleIconVariant={'default'}
                variant='small'
                id={'automation-resource-panel'}
                isOpen={open}
                showClose={true}
                onClose={this.handleCloseClick}
                aria-label={titleText}
                header={
                  <React.Fragment>
                    <div className='ansible_modal_title'>{titleText}</div>
                    {readyFlag &&
                      <div>
                      {!opInstalledLoading && !opInstalled && renderAnsibleOperatorNotInstalled(locale)}
                      {alertTitle && notificationOpen &&
                          <Alert
                            variant={alertVariant}
                            isInline={true}
                            title={alertTitle}
                            actionClose={actionClose}
                          >
                          </Alert>
                      }
                      <div className='infoArea'>
                        {msgs.get(`ansible.automation.description.${panelType}`, locale)}
                      </div>
                      <Title headingLevel="h3">
                        {msgs.get('table.header.policy.name', locale)}
                      </Title>
                      <div className='infoArea'>
                        {policyName}
                      </div>
                      <Title headingLevel="h3">
                        {msgs.get('table.header.cluster.violation', locale)}
                      </Title>
                      <div className='infoArea'>
                        {getPolicyCompliantStatus(policyData, locale, 'clusterCompliant')}
                      </div>
                      {TitleWithTooltip({
                        className: 'titleWithTooltip',
                        headingLevel: 'h3',
                        position: 'top',
                        title: msgs.get('ansible.tower.URL.title', locale),
                        tooltip: msgs.get('ansible.launch.connection', locale),
                      })}
                      <div className='infoArea ansibleTowerURL'>
                        {towerURL && renderAnsibleURL('towerURL', towerURL, towerURL, 60, false, null)}
                      </div>
                    </div>
                  }
                  </React.Fragment>
                }
                actions={(panelType === 'create' && opInstalled || policyAutoName !== '') && readyFlag &&
                  buildModalButtonList({
                    onlyEdit, activeItem, opInstalled, policyAutoName, locale,
                    handleSubmitClick:this.handleSubmitClick,
                    handleCloseClick:this.handleCloseClick,
                    handleOpenDelModal:this.handleOpenDelModal
                  })}
                >
                <div>
                  {!readyFlag && <Spinner className='patternfly-spinner' />}
                </div>
                {renderAnsibleRemovalModal({
                  openDelModal, policyAutoName, locale,
                  handleDeleteClick:this.handleDeleteClick,
                  handleCloseDelModal:this.handleCloseDelModal,
                })}
                {readyFlag &&
                  renderAnsiblePanelContent({
                    data, activeItem, locale, handleTabClick:this.handleTabClick,
                    credentialName, credentialIsOpen,
                    setCredentialsSelectionValue:this.setCredentialsSelectionValue,
                    onCredentialsSelectionToggle:this.onCredentialsSelectionToggle,
                    renderAnsibleJobTemplatesSelection:this.renderAnsibleJobTemplatesSelection,
                    getAnsibleConnection:this.getAnsibleConnection,
                  })}
                </AcmModal>
              </React.Fragment>
            )
          }}
        </Query>}
    </div>
    )
  }

  setCredentialsSelectionValue = (event, selection, ansCredentials) => {
    this.setState({
        credentialName: selection,
        credentialIsOpen: false
      })
    this.getAnsibleConnection(ansCredentials, selection, 'edit')
  }

  onCredentialsSelectionToggle = isOpen => {
    this.setState({
      credentialIsOpen:isOpen
    })
  }

  getAnsibleConnection = (ansCredentials, credentialNameNew, type) => {
    const { credentialName:credentialNameOld, credentialNS } = this.state
    const targetCredential = _.find(ansCredentials, ['name', (credentialNameNew || credentialNameOld)])
    let towerURL='', token=''
    if (targetCredential && targetCredential.namespace
      && targetCredential.host && targetCredential.token) {
      towerURL = targetCredential.host
      token = targetCredential.token
      if (credentialNS !== targetCredential.namespace) {
        this.setState({
          credentialNS: targetCredential.namespace,
          towerURL,
        })
      }
      if (type === 'edit') {
        this.setState({
          ansibleConnection: {
            towerURL,
            token,
          }
        })
      }
    }
    return { towerURL, token }
  }

  setJobTemplatesSelectionValue = (event, selection) => {
    this.setState({
        jobTemplateName: selection,
        jobTemplateIsOpen: false
      })
  }

  onJobTemplatesSelectionToggle = isOpen => {
    this.setState({
      jobTemplateIsOpen:isOpen
    })
  }

  renderAnsibleJobTemplatesSelection = (ansibleConnectionOld) => {
    const { ansibleConnection: ansibleConnectionNew } = this.state
    const { locale } = this.props
    return <React.Fragment>
      <Query query={GET_ANSIBLE_JOB_TEMPLATE} variables={(ansibleConnectionNew || ansibleConnectionOld)}>
        {( result ) => {
          const { loading } = result
          const { data={}, error={} } = result
          const queryError = this.getQueryError(error)
          const ansJobTemplates = data ? data.ansibleJobTemplates : data
          const ansJobTemplateFlag = !queryError && !loading && Array.isArray(ansJobTemplates) && ansJobTemplates.length > 0
          const {jobTemplateName, jobTemplateIsOpen, notificationOpen} = this.state
          return (
            <React.Fragment>
              <div>
                {loading && <Spinner className='patternfly-spinner' />}
              </div>
              <React.Fragment>
                {ansJobTemplateFlag &&
                <React.Fragment>
                  {TitleWithTooltip({
                    className: 'titleWithTooltip',
                    headingLevel: 'h3',
                    position: 'top',
                    title: msgs.get('ansible.jobTemplates.selection.title', locale),
                    tooltip: msgs.get('ansible.jobTemplates.selection.title', locale),
                  })}
                  <div className='infoArea createJobTemplate'>
                    <Select
                      variant={SelectVariant.single}
                      placeholderText={msgs.get('ansible.jobTemplates.selection.placeholder', locale)}
                      aria-label={msgs.get('ansible.jobTemplates.selection.placeholder', locale)}
                        onSelect={this.setJobTemplatesSelectionValue}
                        onToggle={this.onJobTemplatesSelectionToggle}
                        selections={jobTemplateName}
                        isOpen={jobTemplateIsOpen}
                      >
                      {ansJobTemplates.map((jobTemplate) => (
                        <SelectOption
                          key={_uniqueId(jobTemplate.name)}
                          value={jobTemplate.name ? jobTemplate.name : '-'}
                          isPlaceholder={jobTemplate.name ? jobTemplate.name : '-'}
                          description={jobTemplate.description ? jobTemplate.description : '-'}
                        />
                      ))}
                    </Select>
                  </div>
                  {jobTemplateName && this.renderAnsibleJobTemplateEditor()}
                  {jobTemplateName && this.renderAnsibleScheduleMode()}
                </React.Fragment>}
                {!ansJobTemplateFlag && !loading && notificationOpen &&
                <div className='infoArea'>
                  <Alert
                    variant={'info'}
                    isInline={true}
                    title={queryError ? queryError : msgs.get('ansible.no.jobTemplates.info', locale)}
                    actionClose={<AlertActionCloseButton onClose={this.closeAlert} />}
                  >
                  </Alert>
                </div>
                }
              </React.Fragment>
            </React.Fragment>
          )
        }}
        </Query>
    </React.Fragment>
  }

  editorOnChange = newValue => {
    this.setState({
      extraVars:newValue
    })
  }

  renderAnsibleJobTemplateEditor = () => {
    const { locale } = this.props
    const { extraVars } = this.state
    return (
      <div className='infoArea'>
      <AcmExpandableCard title={msgs.get('ansible.jobTemplates.editor.title', locale)}>
        <MonacoEditor
            width="100%"
            height="100"
            language="yaml"
            onChange={this.editorOnChange}
            value={extraVars}
          />
        </AcmExpandableCard>
      </div>
    )
  }

  handleScheduleModeRadioChange = (update, event) => {
    const { value } = event.currentTarget
    this.setState({ansScheduleMode:value})
  };

  renderAnsibleScheduleMode = () => {
    const { locale } = this.props
    const {ansScheduleMode} = this.state
    return <React.Fragment>
      {TitleWithTooltip({
          className: 'titleWithTooltip',
          headingLevel: 'h3',
          position: 'bottom',
          title: msgs.get('ansible.scheduleMode.title', locale),
          tooltip: msgs.get('ansible.scheduleMode.title', locale),
      })}
      <div className='infoArea'>
        <Text className='ansible_scheduleMode_info'>
          {msgs.get('ansible.scheduleMode.info', locale)}
        </Text>
      </div>
      <React.Fragment>
        {this.renderAnsibleScheduleRadio(
          (ansScheduleMode==='manual'),
          'manualRadio',
          'manualRadio',
          'manual'
        )}
        {this.renderAnsibleScheduleRadio(
          (ansScheduleMode==='once'),
          'onceRadio',
          'onceRadio',
          'once'
        )}
        {this.renderAnsibleScheduleRadio(
          (ansScheduleMode==='disabled'),
          'disableRadio',
          'disableRadio',
          'disabled'
        )}
      </React.Fragment>
    </React.Fragment>
  }

  renderAnsibleScheduleRadio = (isChecked, name, id, value) => {
    const { locale } = this.props
    return <Radio
      isChecked={isChecked}
      name={name}
      onChange={this.handleScheduleModeRadioChange}
      label={msgs.get(`ansible.scheduleMode.${value}.title`, locale)}
      id={id}
      value={value}
      description={msgs.get(`ansible.scheduleMode.${value}.info`, locale)}
    />
  }
}

AnsibleAutomationModal.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
  handleCopyAnsibleSecret: PropTypes.func,
  handleModifyPolicyAutomation: PropTypes.func,
  locale: PropTypes.string,
  onlyEdit: PropTypes.bool,
  open: PropTypes.bool,
  refetch: PropTypes.func,
  type: PropTypes.string,
}

const mapStateToProps = state =>  {
  return state.modal
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: (modalType) => {
      dispatch(clearRequestStatus())
      dispatch(updateModal({open: false, type: modalType}))
    },
    handleModifyPolicyAutomation: (poliyAutomationJSON, action) =>
      dispatch(modifyPolicyAutomation(poliyAutomationJSON, action)),
    handleCopyAnsibleSecret: (name, namespace, targetNamespace) =>
      dispatch(copyAnsibleSecret(name, namespace, targetNamespace))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsibleAutomationModal)
