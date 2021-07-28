/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { mount, render } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import toJson from 'enzyme-to-json'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import * as reducers from '../../../src-web/reducers'
import AcmGrcPage from '../../../src-web/containers/AcmGrcPage'
import { ALL_POLICIES, POLICY_STATUS, POLICY_TEMPLATE_DETAILS, POLICY_STATUS_HISTORY } from '../../../src-web/utils/client/queries'
import ALL_POLICIES_QUERY_DATA from './data/ALL_POLICIES_QUERY_DATA'
import ALL_POLICIES_WITH_ATUOMATION_QUERY_DATA from './data/ALL_POLICIES_WITH_AUTOMATION_QUERY_DATA'
import POLICY_STATUS_QUERY_DATA from './data/POLICY_STATUS_QUERY_DATA'
import POLICY_TEMPLATE_DETAILS_QUERY_DATA from './data/POLICY_TEMPLATE_DETAILS_QUERY_DATA'
import POLICY_STATUS_HISTORY_QUERY_DATA from './data/POLICY_STATUS_HISTORY_QUERY_DATA'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunkMiddleware]
const store = createStore(combineReducers(reducers), composeEnhancers(
  applyMiddleware(...middleware)
))

// Mock YamlEditor since we aren't passing it any actual data
jest.mock('../../../src-web/components/common/YamlEditor', () => {
  return function mockYamlEditor() {
    return <div data-testid='mockYamlEditor' />
  }
})

const props = { userAccess: [], locale: 'en' }

describe('AcmGrcPage container', () => {
  it('should render loading spinner', () => {
    const mocks = []
    const component = render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='ALL_POLICIES' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render ALL_POLICIES page ', async () => {
    const mocks = [
      {
        request: {
          query: ALL_POLICIES,
        },
        result: {
          data: ALL_POLICIES_QUERY_DATA.data
        },
      },
    ]
    const component = mount(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='ALL_POLICIES' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))
    component.update()
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render ALL_POLICIES page with all policy automation ', async () => {
    const mocks = [
      {
        request: {
          query: ALL_POLICIES,
        },
        result: {
          data: ALL_POLICIES_WITH_ATUOMATION_QUERY_DATA.data
        },
      },
    ]
    const component = mount(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='ALL_POLICIES' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))
    component.update()
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render POLICY_STATUS page ', async () => {
    const mocks = [
      {
        request: {
          query: POLICY_STATUS,
        },
        result: {
          data: POLICY_STATUS_QUERY_DATA.data
        },
      },
    ]
    const component = mount(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='POLICY_STATUS' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))
    component.update()
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render POLICY_TEMPLATE_DETAILS page ', async () => {

    const props = {
      userAccess: [],
      locale: 'en',
      namespace:'default',
      name:' policy-pod',
      cluster: 'local-cluster',
      apiGroup: 'policy.open-cluster-management.io',
      version: 'v1',
      kind: 'ConfigurationPolicy',
      template: 'policy-pod-nginx-pod',
    }
    const { cluster, apiGroup, version, kind, template } = props
    const selfLink = `/apis/${apiGroup}/${version}/namespaces/${cluster}/${kind}/${template}`
    const mocks = [
      {
        request: {
          query: POLICY_TEMPLATE_DETAILS,
          variables: { name:template, cluster, kind, selfLink },
        },
        result: {
          data: POLICY_TEMPLATE_DETAILS_QUERY_DATA.data
        },
      },
    ]
    const component = mount(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='POLICY_TEMPLATE_DETAILS' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))
    component.update()
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should render POLICY_STATUS_HISTORY page ', async () => {
    const props = {
      userAccess: [],
      locale: 'en',
      namespace:'default',
      name:' policy-pod',
      cluster: 'local-cluster',
    }
    const mocks = [
      {
        request: {
          query: POLICY_STATUS_HISTORY,
          variables: { policyName: props.name, hubNamespace: props.namespace, cluster: props.cluster, template: props.template },
        },
        result: {
          data: POLICY_STATUS_HISTORY_QUERY_DATA.data
        },
      },
    ]
    const component = mount(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
            <AcmGrcPage type='POLICY_STATUS_HISTORY' {...props} />
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    )

    await new Promise(resolve => setTimeout(resolve, 0))
    component.update()
    expect(toJson(component)).toMatchSnapshot()
  })
})
