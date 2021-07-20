/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { useQuery } from '@apollo/client'
import {
  AcmPageContent, AcmPageHeader, AcmAutoRefreshSelect,
  AcmRefreshTime, AcmSecondaryNav, AcmAlert, AcmPage
} from '@open-cluster-management/ui-components'
import { Spinner, PageSection } from '@patternfly/react-core'
import { useHistory, useParams } from 'react-router-dom'

import {
  INITIAL_POLL_INTERVAL,
  REFRESH_INTERVALS,
  REFRESH_INTERVAL_COOKIE
} from '../utils/constants'
import { getPageDefinition } from './definitions/PageDefinitions'
import _ from 'lodash'

let timestamp = new Date().toString()

// merge policyAutomations info into policies info
// by matching policyName + policyNS
function addAutomationToPolicy(policies, policyAutomations) {
  const policiesCopy = _.cloneDeep(policies)
  const policyAutomationsMap = new Map()
  if (Array.isArray(policyAutomations) && policyAutomations.length > 0) {
    policyAutomations.forEach((policyAutomation) => {
      const policyAutomationNS = _.get(policyAutomation, 'metadata.namespace')
      const policyName = _.get(policyAutomation, 'spec.policyRef')
      if (policyAutomationNS && policyName) {
        const policyAutomationsMapKey = `${policyAutomationNS}/${policyName}`
        policyAutomationsMap.set(policyAutomationsMapKey, policyAutomation)
      }
    })
  }

  if (policyAutomationsMap.size > 0){
    policiesCopy.forEach((policy) => {
      const policyNS = _.get(policy, 'metadata.namespace')
      const policyName = _.get(policy, 'metadata.name')
      if (policyName && policyNS) {
        const policyMapKey = `${policyNS}/${policyName}`
        policy.policyAutomation = policyAutomationsMap.get(policyMapKey)
      }
    })
  }
  return policiesCopy
}

function AcmGrcPage(props) {
  const allProps = {...props, ...useParams(), history: useHistory()}
  const page = getPageDefinition(allProps)
  const { loading, data={}, refetch, error, previousData } = useQuery(
    page.query,
    { variables: page.query_variables, notifyOnNetworkStatusChange: true })
  const { policyAutomations } = data
  let { items } = data
  items = addAutomationToPolicy(items, policyAutomations)
  if (!loading) {
    timestamp = new Date().toString()
  }
  return (
    <React.Fragment>
      <AcmPage
        header={
          <AcmPageHeader title={page.title}
            breadcrumb={page.breadcrumb}
            navigation={page.navigation && (
              <AcmSecondaryNav>
                {page.navigation.map(nav => nav(allProps))}
              </AcmSecondaryNav>
            )}
            controls={
              <React.Fragment>
                {page.refreshControls && (
                  <React.Fragment>
                    <AcmAutoRefreshSelect refetch={refetch}
                      refreshIntervals={REFRESH_INTERVALS}
                      refreshIntervalCookie={REFRESH_INTERVAL_COOKIE}
                      initPollInterval={INITIAL_POLL_INTERVAL} />
                    <AcmRefreshTime timestamp={timestamp} reloading={loading} />
                  </React.Fragment>
                )}
                <div className='page-header-button-group'>
                {page.buttons && (
                  page.buttons.map(btn => btn(allProps))
                )}
                </div>
              </React.Fragment>}>
          </AcmPageHeader>
        }
      >
        <AcmPageContent id={page.id}>
          <PageSection>
            {(() => {
              if (error) {
                // Handle Apollo networkError type
                let eHeader
                const eMsg = []
                if (error.networkError) {
                  const { statusCode='', result='' } = error.networkError
                  let {bodyText='', message=''} = error.networkError
                  if (statusCode === 403) {
                    bodyText = error.networkError.response.statusText
                    message = ''
                  }
                  eHeader = <p key='eHeader'>Network Error {statusCode}</p>
                  eMsg.push(<p key='eBodyText'>{bodyText}</p>)
                  eMsg.push(<p key='eMessage'>{message}</p>)
                  if (result.errors) {
                    eMsg.push(
                      <p key='eMsgDetails'>
                        {result.errors.map((e) => e.message).join(';')}
                      </p>
                    )
                  }
                // Handle Apollo graphQLErrors type
                } else {
                  let errorMessages = []
                  if (error.graphQLErrors.length > 0) {
                    errorMessages = error.graphQLErrors
                  } else {
                    errorMessages = error.errors
                  }
                  eHeader = <p key='eHeader'>GraphQL Error</p>
                  eMsg.push(
                    <p key='eMessage'>{
                      errorMessages.map((e) => e.message).join(';')}
                    </p>
                  )
                }
                return <AcmAlert isInline={true} noClose={true} variant='danger'
                  title={eHeader} subtitle={eMsg} />
              }
              if (loading && !previousData || items === undefined ) {
                return <Spinner className='patternfly-spinner' />
              } else {
                return page.children({ items })
              }
            })()}
          </PageSection>
        </AcmPageContent>
      </AcmPage>
    </React.Fragment>
  )
}

export default AcmGrcPage
