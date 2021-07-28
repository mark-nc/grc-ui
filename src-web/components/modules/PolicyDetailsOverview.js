/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Alert } from '@patternfly/react-core'
import msgs from '../../nls/platform.properties'
import { AcmDescriptionList, AcmTable } from '@open-cluster-management/ui-components'
import NoResource from '../../components/common/NoResource'
import policyDetailsClusterListDef from '../../tableDefinitions/policyDetailsClusterListDef'
import policyDetailsOverviewDef from '../../tableDefinitions/policyDetailsOverviewDef'
import { transform, getPolicyCompliantStatus, getAutomationLink } from '../../tableDefinitions/utils'
import moment from 'moment'

import '../../scss/policy-details-overview.scss'

export class PolicyDetailsOverview extends React.PureComponent{
  constructor(props) {
    super(props)
  }

  static propTypes = {
    items: PropTypes.array,
    // location: PropTypes.object,
    // resourceType: PropTypes.object,
  }

  static contextTypes = {
    locale: PropTypes.string
  }

  getDescriptionItems = (items, localItem, locale) => {
     return items.map((item) => {
      // AcmDescriptionList wants the items in {key: ..., value: ...} form
      const entry = {}
      if (Array.isArray(item.cells) && item.cells[0]) {
        const keyPath = item.cells[0].resourceKey || '-'
        const keyType = item.cells[0].type || '-'
        const dataResourceKey = item.cells[1] ? item.cells[1].resourceKey : '-'
        entry.key = msgs.get(keyPath, locale) ? msgs.get(keyPath, locale) : '-'
        const entryData = (dataResourceKey === '-') ? localItem : _.get(localItem, dataResourceKey, '-')
        if ((keyType !== 'automation') && (typeof(entryData) === 'object' || typeof(entryData) === 'boolean')) {
          entry.value = JSON.stringify(entryData).replace(/\[|\]|"/g, ' ')
        } else {
          entry.value = entryData
        }

        if (keyPath) {
          if(keyType === 'timestamp') {
            entry.value = moment(entry.value, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
          } else if(dataResourceKey === 'clusterCompliant') {
            entry.value = getPolicyCompliantStatus({clusterCompliant: entry.value}, locale)
          } else if (keyType === 'automation') {
            entry.value = getAutomationLink(entry.value, locale, items.refetch)
          }
        }
      }
      return entry
    })
  }

  render() {
    const {items=[]} = this.props
    if (items.length === 0) {
      return <NoResource
        title={msgs.get('error.not.found', [msgs.get('routes.grc', locale)], locale)}
        svgName='EmptyPagePlanet-illus.png'>
      </NoResource>
    } else if (items.length > 1) {
      console.error(`Only one policy was expected but ${items.length} were received. The other policies will be ignored.`)
    }
    const localItem = items[0]
    const { locale } = this.context
    const clusterList = transform([localItem], policyDetailsClusterListDef, locale)

    const modulesSecond = [
      <AcmTable
        key='cluster-list'
        items={clusterList.rows}
        columns={clusterList.columns}
        keyFn={(item) => item.uid.toString()}
        gridBreakPoint=''
        autoHidePagination={true}
      />
    ]
    const itemPR = Array.isArray(localItem?.placementPolicies) && localItem.placementPolicies.length > 0
    const itemPB = Array.isArray(localItem?.placementBindings) && localItem.placementBindings.length > 0
    const descriptionItems = this.getDescriptionItems(policyDetailsOverviewDef.rows, localItem, locale)
    const itemsHalfCount = Math.ceil(descriptionItems.length / 2)

    return (
      <div className='overview-content'>
        <div className='vertical-expend' id='compliance.details'>
          <AcmDescriptionList
            title={msgs.get(policyDetailsOverviewDef.title, locale)}
            leftItems={descriptionItems.slice(0, itemsHalfCount)}
            rightItems={descriptionItems.slice(itemsHalfCount)}
          />
        </div>
        <div className='vertical-expend cluster-list'>
          <h5 className='section-title'>{msgs.get('table.header.placement', locale)}</h5>
          {itemPR && itemPB
            ? modulesSecond
            : <Alert title={msgs.get('error.no.placement', locale)} isInline='true' />}
        </div>
      </div>
    )
  }
}

export default withRouter(PolicyDetailsOverview)
