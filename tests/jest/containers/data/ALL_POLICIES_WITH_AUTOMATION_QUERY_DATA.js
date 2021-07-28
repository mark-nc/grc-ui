/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

export default {
   'data': {
     'items': [
       {
         'metadata': {
           'name': 'policy-grc-1199',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-1199',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
             'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '195975',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-1199',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
               'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T13:56:30Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T13:56:30Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T13:56:51Z'
               }
             ],
             'name': 'policy-grc-1199',
             'namespace': 'default',
             'resourceVersion': '195975',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-1199',
             'uid': 'df54241b-59c7-4fe4-8a7d-eec2761391f5'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-grc-1199-prod-ns'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'Namespace',
                           'metadata': {
                             'name': 'prod'
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'low'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'NonCompliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-1199',
                 'placementRule': 'placement-policy-grc-1199'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'NonCompliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '1/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-12',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-12',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
             'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '143739',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-12',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
               'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T12:55:42Z',
             'generation': 2,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T12:55:42Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:placement': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T12:56:03Z'
               }
             ],
             'name': 'policy-grc-12',
             'namespace': 'default',
             'resourceVersion': '143739',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-12',
             'uid': '46151e1d-87bf-4f4b-9c30-29b59324a32d'
           },
           'spec': {
             'disabled': true,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-grc-12-prod-ns'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'Namespace',
                           'metadata': {
                             'name': 'prod'
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'low'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-12',
                 'placementRule': 'placement-policy-grc-12'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '-',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-14',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-14',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.AC Identity Management and Access Control',
             'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '144738',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-14',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.AC Identity Management and Access Control',
               'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T13:12:03Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T13:12:03Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T13:12:32Z'
               }
             ],
             'name': 'policy-grc-14',
             'namespace': 'default',
             'resourceVersion': '144738',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-14',
             'uid': 'fe4e9c66-0886-456a-a9b5-e52170c7c04f'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'IamPolicy',
                   'metadata': {
                     'name': 'policy-grc-14-limit-clusteradmin'
                   },
                   'spec': {
                     'maxClusterRoleBindingUsers': 5,
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*',
                         'openshift-*'
                       ],
                       'include': [
                         '*'
                       ]
                     },
                     'remediationAction': 'inform',
                     'severity': 'medium'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'Compliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-14',
                 'placementRule': 'placement-policy-grc-14'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'Compliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '0/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-2021',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-2021',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
             'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '179229',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-2021',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
               'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T13:42:02Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T13:42:02Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T13:42:20Z'
               }
             ],
             'name': 'policy-grc-2021',
             'namespace': 'default',
             'resourceVersion': '179229',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-2021',
             'uid': '74e1c21c-9e5c-45a8-94a5-7385b83b08d7'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-grc-2021-prod-ns'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'Namespace',
                           'metadata': {
                             'name': 'prod'
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'low'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'NonCompliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-2021',
                 'placementRule': 'placement-policy-grc-2021'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'NonCompliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '1/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-456',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-456',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
             'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '147691',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-456',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
               'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T13:13:04Z',
             'generation': 4,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T13:13:04Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:placement': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T13:14:53Z'
               }
             ],
             'name': 'policy-grc-456',
             'namespace': 'default',
             'resourceVersion': '147691',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-456',
             'uid': '61f0451e-31c1-4db8-b73c-cb967d726b99'
           },
           'spec': {
             'disabled': true,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-grc-456-container-mem-limit-range'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'LimitRange',
                           'metadata': {
                             'name': 'container-mem-limit-range'
                           },
                           'spec': {
                             'limits': [
                               {
                                 'default': {
                                   'memory': '512Mi'
                                 },
                                 'defaultRequest': {
                                   'memory': '256Mi'
                                 },
                                 'type': 'Container'
                               }
                             ]
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'medium'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-456',
                 'placementRule': 'placement-policy-grc-456'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '-',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-7777777',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-7777777',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
             'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '203001',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-7777777',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.IP Information Protection Processes and Procedures',
               'policy.open-cluster-management.io/controls': 'PR.IP-1 Baseline Configuration',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T14:02:35Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T14:02:35Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T14:02:53Z'
               }
             ],
             'name': 'policy-grc-7777777',
             'namespace': 'default',
             'resourceVersion': '203001',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-7777777',
             'uid': '0d19d0f2-db9e-4794-81a3-5a91b3af1362'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-grc-7777777-prod-ns'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'Namespace',
                           'metadata': {
                             'name': 'prod'
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'low'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'NonCompliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-7777777',
                 'placementRule': 'placement-policy-grc-7777777'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'NonCompliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '1/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-grc-dffdr',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-dffdr',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.AC Identity Management and Access Control',
             'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '241902',
           '__typename': 'Metadata'
         },
         'name': 'policy-grc-dffdr',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.AC Identity Management and Access Control',
               'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T14:36:08Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T14:36:08Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T14:36:36Z'
               }
             ],
             'name': 'policy-grc-dffdr',
             'namespace': 'default',
             'resourceVersion': '241902',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-dffdr',
             'uid': '4fe961c3-1ee3-434b-b723-9c96195bbd39'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'IamPolicy',
                   'metadata': {
                     'name': 'policy-grc-dffdr-limit-clusteradmin'
                   },
                   'spec': {
                     'maxClusterRoleBindingUsers': 5,
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*',
                         'openshift-*'
                       ],
                       'include': [
                         '*'
                       ]
                     },
                     'remediationAction': 'inform',
                     'severity': 'medium'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'Compliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-grc-dffdr',
                 'placementRule': 'placement-policy-grc-dffdr'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'Compliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '0/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       },
       {
         'metadata': {
           'name': 'policy-pod-777',
           'namespace': 'default',
           'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-pod-777',
           'annotations': {
             'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology, PR.AC Identity Management and Access Control',
             'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality, PR.AC-4 Access Control',
             'policy.open-cluster-management.io/standards': 'NIST-CSF'
           },
           'resourceVersion': '150764',
           '__typename': 'Metadata'
         },
         'name': 'policy-pod-777',
         'namespace': 'default',
         'raw': {
           'apiVersion': 'policy.open-cluster-management.io/v1',
           'kind': 'Policy',
           'metadata': {
             'annotations': {
               'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology, PR.AC Identity Management and Access Control',
               'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality, PR.AC-4 Access Control',
               'policy.open-cluster-management.io/standards': 'NIST-CSF'
             },
             'creationTimestamp': '2021-07-28T13:17:11Z',
             'generation': 1,
             'managedFields': [
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:metadata': {
                     'f:annotations': {
                       '.': {},
                       'f:policy.open-cluster-management.io/categories': {},
                       'f:policy.open-cluster-management.io/controls': {},
                       'f:policy.open-cluster-management.io/standards': {}
                     }
                   },
                   'f:spec': {
                     '.': {},
                     'f:disabled': {},
                     'f:policy-templates': {},
                     'f:remediationAction': {}
                   }
                 },
                 'manager': 'unknown',
                 'operation': 'Update',
                 'time': '2021-07-28T13:17:11Z'
               },
               {
                 'apiVersion': 'policy.open-cluster-management.io/v1',
                 'fieldsType': 'FieldsV1',
                 'fieldsV1': {
                   'f:status': {
                     '.': {},
                     'f:compliant': {},
                     'f:placement': {},
                     'f:status': {}
                   }
                 },
                 'manager': 'governance-policy-propagator',
                 'operation': 'Update',
                 'time': '2021-07-28T13:17:32Z'
               }
             ],
             'name': 'policy-pod-777',
             'namespace': 'default',
             'resourceVersion': '150764',
             'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-pod-777',
             'uid': '4b4f5985-6b00-47d1-97b8-ffa1f423fd48'
           },
           'spec': {
             'disabled': false,
             'policy-templates': [
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-pod-777-nginx-pod'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'musthave',
                         'objectDefinition': {
                           'apiVersion': 'v1',
                           'kind': 'Pod',
                           'metadata': {
                             'name': 'nginx-pod'
                           },
                           'spec': {
                             'containers': [
                               {
                                 'image': 'nginx:1.18.0',
                                 'name': 'nginx',
                                 'ports': [
                                   {
                                     'containerPort': 80
                                   }
                                 ]
                               }
                             ]
                           }
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'low'
                   }
                 }
               },
               {
                 'objectDefinition': {
                   'apiVersion': 'policy.open-cluster-management.io/v1',
                   'kind': 'ConfigurationPolicy',
                   'metadata': {
                     'name': 'policy-pod-777-deployments-role'
                   },
                   'spec': {
                     'namespaceSelector': {
                       'exclude': [
                         'kube-*'
                       ],
                       'include': [
                         'default'
                       ]
                     },
                     'object-templates': [
                       {
                         'complianceType': 'mustonlyhave',
                         'objectDefinition': {
                           'apiVersion': 'rbac.authorization.k8s.io/v1',
                           'kind': 'Role',
                           'metadata': {
                             'name': 'deployments-role'
                           },
                           'rules': [
                             {
                               'apiGroups': [
                                 'extensions',
                                 'apps'
                               ],
                               'resources': [
                                 'deployments'
                               ],
                               'verbs': [
                                 'get',
                                 'list',
                                 'watch',
                                 'delete',
                                 'patch'
                               ]
                             }
                           ]
                         }
                       }
                     ],
                     'remediationAction': 'inform',
                     'severity': 'high'
                   }
                 }
               }
             ],
             'remediationAction': 'inform'
           },
           'status': {
             'compliant': 'NonCompliant',
             'placement': [
               {
                 'placementBinding': 'binding-policy-pod-777',
                 'placementRule': 'placement-policy-pod-777'
               }
             ],
             'status': [
               {
                 'clustername': 'local-cluster',
                 'clusternamespace': 'local-cluster',
                 'compliant': 'NonCompliant'
               }
             ]
           }
         },
         'remediation': 'inform',
         'policyCompliant': '0/0',
         'clusterCompliant': '1/1/0',
         'clusterNS': {
           'local-cluster': 'local-cluster'
         },
         'clusterConsoleURL': {
           'local-cluster': 'https://console-openshift-console.apps.policy-grc-cp-autoclaims-jgb6v.dev08.red-chesterfield.com'
         },
         '__typename': 'Compliance'
       }
     ],
     'policyAutomations': [
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-1199-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '195796',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-1199'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-12-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '141774',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-12'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-14-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '144498',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-14'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-2021-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '179365',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-2021'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-7777777-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '203890',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-7777777'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-9999999-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '199578',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-9999999'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-grc-dffdr-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '241661',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'ACM Policy Compliance Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-grc-dffdr'
         },
         '__typename': 'PolicyAutomation'
       },
       {
         'kind': 'PolicyAutomation',
         'apiVersion': 'policy.open-cluster-management.io/v1beta1',
         'metadata': {
           'name': 'policy-pod-777-policy-automation',
           'namespace': 'default',
           'annotations': {
             'policy.open-cluster-management.io/rerun': 'false'
           },
           'resourceVersion': '181142',
           '__typename': 'Metadata'
         },
         'spec': {
           'automationDef': {
             'name': 'Demo Job Template',
             'secret': 'grc-test-1',
             'type': 'AnsibleJob'
           },
           'mode': 'disabled',
           'policyRef': 'policy-pod-777'
         },
         '__typename': 'PolicyAutomation'
       }
     ]
   }
 }

