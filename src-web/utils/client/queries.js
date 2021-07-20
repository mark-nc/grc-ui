/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'

export const createResources = gql`
  mutation createResources($resources: [JSON]!) {
    createResources(resources: $resources)
  }
`

export const createAndUpdateResources = gql`
  mutation createAndUpdateResources($toCreate: [JSON], $toUpdate: [JSON]) {
    createAndUpdateResources(toCreate: $toCreate, toUpdate: $toUpdate)
  }
`
export const modifyPolicyAutomation = gql`
  mutation modifyPolicyAutomation($poliyAutomationJSON: [JSON], $action: String!) {
    modifyPolicyAutomation(poliyAutomationJSON: $poliyAutomationJSON, action: $action)
  }
`
export const updateResource = gql`
  mutation updateResource($namespace: String!, $name: String!, $body: JSON, $selfLink: String!, $resourcePath: String) {
    updateResource(namespace: $namespace, name: $name, body: $body, selfLink: $selfLink, resourcePath: $resourcePath)
  }
`
// retrieve existing placementbinding before submit create policy
export const PlacementBinding = gql`
  query getPlacementBindings($pbs: JSON!) {
    placementBindings: placementBindings(pbs: $pbs) {
      metadata {
        name
        namespace
        resourceVersion
        selfLink
      }
    }
  }
`
// retrieve existing placementrule before submit create policy
export const PlacementRule = gql`
  query getPlacementRules($prs: JSON!) {
    placementRules: placementRules(prs: $prs) {
      metadata {
        name
        namespace
        resourceVersion
        selfLink
      }
    }
  }
`
// retrieve existing policies before submit create policy
export const Policy = gql`
  query getPolicies($name: String!, $clusterName: String) {
    policies: policies(name: $name, clusterName: $clusterName) {
      metadata {
        name
        resourceVersion
        selfLink
      }
    }
  }
`

// delete resource based on selflink
export const DELETE_RESOURCE = gql`
  mutation deleteCompliance($selfLink: String!, $resources: JSON) {
    deleteCompliance(selfLink: $selfLink, resources: $resources)
  }
`

// retrieve policy details in cluster namespace
export const POLICY_DETAILS_FOR_CLUSTER = gql`
  query getPolicyInClusterNamespace($name: String!, $clusterName: String) {
    policies: policies(name: $name, clusterName: $clusterName) {
      cluster
      metadata {
        name
        namespace
        selfLink
        creationTimestamp
        annotations
        labels
        resourceVersion
        uid
      }
      status
      remediation
      raw
      policyTemplates {
        name
        kind
        lastTransition
        complianceType
        apiVersion
        status
        raw
      }
      violations {
        name
        cluster
        message
        timestamp
      }
    }
  }
`

// retrieve existing labels, policies, annotations to populate create policy form
export const CREATE_POLICY_DISCOVERY = gql`
  query getDiscoveries {
    discoveries {
      clusterLabels
      policyNames
      annotations {
        standards
        categories
        controls
      }
      templates {
        name
        spec
      }
      namespaces
      policiesByNamespace
    }
  }
`
// retrieve existing labels, policies, annotations to populate create policy form
export const EDIT_POLICY_DISCOVERY = gql`
  query EditDiscoveries($name: String!, $namespace: String!) {
    discoveries{
      clusterLabels
      policyNames
      annotations {
        standards
        categories
        controls
      }
      namespaces
      policiesByNamespace
    }
    policyDiscoveries:compliances(name: $name, namespace: $namespace) {
      policy: raw
      placementPolicies {
        raw
      }
      placementBindings {
        raw
      }
    }
  }
`

// retrieve all policies for all policies table
export const ALL_POLICIES = gql`
  query getAllPolicies {
    items: compliances {
      metadata {
        name
        namespace
        selfLink
        annotations
        resourceVersion
      }
      name
      namespace
      raw
      remediation
      policyCompliant
      clusterCompliant
      clusterNS
      clusterConsoleURL
    }
    policyAutomations {
      kind
      apiVersion
      metadata {
        name
        namespace
        annotations
        resourceVersion
      }
      spec
    }
  }
`
// retrieve policy details for policy details drilldown
export const SINGLE_POLICY = gql`
  query getSinglePolicy($name: String!, $namespace: String) {
    items: compliances(name: $name, namespace: $namespace) {
      raw
      metadata {
        creationTimestamp
        name
        namespace
        annotations
        selfLink
      }
      placementPolicies {
        metadata {
          annotations
          name
          namespace
          creationTimestamp
          selfLink
        }
        clusterLabels
        status
        raw
      }
      placementBindings {
        metadata {
          name
          namespace
          creationTimestamp
          selfLink
        }
        placementRef {
          name
          kind
        }
        subjects {
          name
          apiGroup
          kind
        }
        raw
      }
      clusterCompliant
    }
    policyAutomations(namespace: $namespace) {
      kind
      apiVersion
      metadata {
        name
        namespace
        annotations
        resourceVersion
      }
      spec
    }
  }
`
// retrieve policy template details on managed cluster
export const POLICY_TEMPLATE_DETAILS = gql`
query getPolicyTemplateDetails($name: String!, $kind: String!, $cluster: String!, $selfLink: String!) {
  items: getResource(
    namespace: $cluster,
    kind: $kind,
    name: $name,
    cluster: $cluster,
    selfLink: $selfLink
  )
}
`
// retrieve policy status for policy status tab
export const POLICY_STATUS = gql`
  query getPolicyStatus($policyName: String!, $hubNamespace: String!) {
    items: policyStatus(policyName: $policyName, hubNamespace: $hubNamespace) {
      templateName
      cluster
      clusterNamespace
      status
      apiVersion
      kind
      message
      timestamp
      consoleURL
      policyName
      policyNamespace
    }
  }
`
// retrieve policy status for policy status tab
export const POLICY_STATUS_HISTORY = gql`
query getStatusHistory($policyName: String!, $hubNamespace: String!, $cluster: String!, $template: String!) {
  items: statusHistory(
    policyName: $policyName,
    hubNamespace: $hubNamespace,
    cluster: $cluster,
    template: $template
  ) {
    message
    timestamp
  }
}
`
// retrieve refresh control on client side
export const GET_REFRESH_CONTROL = gql`
  query getRefreshControl {
    reloading @client
    timestamp @client
    startPolling @client
    stopPolling @client
    refetch @client
    refreshCookie @client
  }
`

// retrieve user access info
export const getUserAccess = gql`
  query getUserAccess {
    items: getUserAccessCredentials
  }
`

// retrieve ansible access info
export const GET_ANSIBLE_CREDENTIALS = gql`
  query getAnsibleCredentials($name: String, $namespace: String) {
    ansibleCredentials(name: $name, namespace: $namespace) {
      name
      namespace
      host
      token
    }
  }
`

// retrieve ansible job template
export const GET_ANSIBLE_JOB_TEMPLATE = gql`
  query getAnsibleJobTemplates($towerURL: String!, $token: String!) {
    ansibleJobTemplates(host: $towerURL, token: $token) {
      name
      description
      extra_vars
    }
  }
`

// retrieve ansible history
export const GET_ANSIBLE_HISTORY = gql`
  query ansibleAutomationHistories($name: String!, $namespace: String!) {
    items: ansibleAutomationHistories(name: $name, namespace: $namespace) {
      name
      message
      status
      started
      finished
      job
    }
  }
`

// check if ansible operator installed
export const GET_ANSIBLE_OPERATOR_INSTALLED = gql`
  query ansibleOperatorInstalled($namespace: String!) {
    ansibleOperatorInstalled(namespace: $namespace) {
      installed
    }
  }
`

// retrieve ansible secret
export const COPY_ANSIBLE_SECRET = gql`
  query copyAnsibleSecret($name: String!, $namespace: String!, $targetNamespace: String!) {
    copyAnsibleSecret(name: $name, namespace: $namespace, targetNamespace: $targetNamespace) {
      name
    }
  }
`

// retrieve Policy Automations
export const POLICY_AUTOMATIONS = gql`
  query policyAutomations($namespace: String) {
    policyAutomations(namespace: $namespace) {
      kind
      apiVersion
      metadata {
        name
        namespace
        annotations
        resourceVersion
      }
      spec
    }
  }
`
