/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import msgs from '../../nls/platform.properties'
import TruncateText from '../../components/common/TruncateText'
import { updateModal } from '../../actions/common'
import { checkCreateRole, checkEditRole } from '../../utils/CheckUserPermission'
import {
    AcmLaunchLink
} from '@open-cluster-management/ui-components'
import { Button } from '@patternfly/react-core'
import _ from 'lodash'

import '../../scss/resource-filterbar.scss'
import { createDisableTooltip } from './DisableTooltip'

class AutomationButton extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { item, locale, userAccess, refetch } = this.props
    const automationAccess = this.checkPermissions(userAccess, item.metadata.namespace)
    const policyAutomation = _.get(item, 'policyAutomation')
    if (policyAutomation) {
      const automationName = _.get(policyAutomation, 'metadata.name')
      return this.automationLaunch(item, automationName, automationAccess, locale, refetch)
    } else {
      return this.automationConfigure(item, automationAccess, locale, refetch)
    }
  }

  automationLaunch(item, automationName, automationAccess, locale, refetch) {
    const label = 'automationButton'
    const onlyEdit = !automationAccess.CREATE
    const isDisabled = !automationAccess.CREATE && !automationAccess.EDIT
    const configureButton = (
      <AcmLaunchLink links={[
        {
            id: isDisabled
              ? 'disabledAutomationButton'
              : `${label}-${automationName}`,
            text: <TruncateText
            maxCharacters={20}
            text={automationName}
            noTooltip={isDisabled ? true : false}
            />,
            onClick: isDisabled ? undefined : () => {
              this.props.onClickAutomation(item, refetch, onlyEdit)
            },
            label: true,
            noIcon: true,
        },
      ]}></AcmLaunchLink>
    )
    return createDisableTooltip(isDisabled, label, locale, configureButton)
  }

  automationConfigure(item, automationAccess, locale, refetch) {
    const label = 'automationButton'
    const isDisabled = !automationAccess.CREATE
    const configureButton = (
      <Button
        component="a"
        variant="link"
        className={label}
        isDisabled={isDisabled}
        onClick= {() => {
          this.props.onClickAutomation(item, refetch)
        }}
      >
        {msgs.get('table.actions.automation.configure', locale)}
      </Button>
    )
    return createDisableTooltip(isDisabled, label, locale, configureButton)
  }

  checkPermissions(access, ns) {
    // Filter for the namespace of the policy
    const automationAccess = {
      CREATE: false,
      EDIT: false
    }
    if(Array.isArray(access) && access.length > 0) {
      const accessObj = access.filter(role => role.namespace === ns)
      if (accessObj.length > 0 && accessObj[0].rules) {
        // Check for permissions on Policy and PolicyAutomation resources
        const resources = [ 'policy.open-cluster-management.io/policyautomations' ]
        automationAccess.CREATE = checkCreateRole(accessObj[0].rules, resources) === 1
        automationAccess.EDIT = checkEditRole(accessObj[0].rules, resources) === 1
      }
    }
    return automationAccess
  }
}

AutomationButton.propTypes = {
  item: PropTypes.object,
  locale: PropTypes.string,
  onClickAutomation: PropTypes.func,
  refetch: PropTypes.func,
  userAccess: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => {
  const resourceTypeAuto = {
    name: 'HCMCompliance',
  }
  return {
    onClickAutomation: (data, refetch, onlyEdit) => {
      dispatch(updateModal(
        { open: true, type: 'resource-automation', resourceTypeAuto,
          label: {
            primaryBtn: `modal.automation-${resourceTypeAuto.name.toLowerCase()}.heading`,
            label: `modal.automation-${resourceTypeAuto.name.toLowerCase()}.label`,
            heading: `modal.automation-${resourceTypeAuto.name.toLowerCase()}.heading`
          },
          data: { kind: resourceTypeAuto.name, ...data },
          refetch,
          onlyEdit
        }))
    }
  }
}

const mapStateToProps = (state) => {
  const userAccess = state.userAccess ? state.userAccess.access : []
  return {
    userAccess
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutomationButton)
