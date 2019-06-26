###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2017, 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

include Configfile

SHELL := /bin/bash

ifneq ($(ARCH), x86_64)
DOCKER_FILE = Dockerfile.$(ARCH)
else
DOCKER_FILE = Dockerfile
endif
@echo "using DOCKER_FILE: $(DOCKER_FILE)"

.PHONY: init\:
init::
-include $(shell curl -fso .build-harness -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3.raw" "https://raw.github.ibm.com/ICP-DevOps/build-harness/master/templates/Makefile.build-harness"; echo .build-harness)

.PHONY: copyright-check
copyright-check:
	./copyright-check.sh

lint:
	npm run lint

prune:
	npm prune --production

.PHONY: build
build:
	npm run build:production

local:: build lint prune

#Check default DOCKER_BUILD_OPTS/DOCKER_RUN_OPTS/DOCKER_REGISTRY/DOCKER_BUILD_TAG/SCRATCH_TAG/DOCKER_TAG 
# values in Configfile. Only new value other than default need to be set here.
.PHONY: docker-logins
docker-logins:
	make docker:login DOCKER_REGISTRY=$(DOCKER_EDGE_REGISTRY)
	make docker:login DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY)
	make docker:login

.PHONY: image
image:: docker-logins
	make docker:info
	make docker:build
	docker image ls -a

.PHONY: run
run: 
	# Both containers icp-grc-ui and icp-grc-ui-api must be on the same network.
	docker network create --subnet 10.10.0.0/16 $(DOCKER_NETWORK)
	make docker:info DOCKER_NETWORK_OP=$(DOCKER_NETWORK_OP) DOCKER_NETWORK=$(DOCKER_NETWORK)
	make docker:run DOCKER_NETWORK_OP=$(DOCKER_NETWORK_OP) DOCKER_NETWORK=$(DOCKER_NETWORK)

.PHONY: unit-test
unit-test:
	npm install \
	del@3.0.0 \
	enzyme@3.7.0 \
	enzyme-adapter-react-16@1.6.0 \
	jest@22.4.2 \
	react-test-renderer@16.4.0 \
	jsonfile@4.0.0 \
	redux-mock-store@1.5.1 \
	jest-tap-reporter@1.9.0 \
	properties-parser@0.3.1 
ifeq ($(UNIT_TESTS), TRUE)
	if [ ! -d "test-output" ]; then \
		mkdir test-output; \
	fi
	npm test
endif

.PHONY: e2e-test
e2e-test:
ifeq ($(SELENIUM_TESTS), TRUE)
ifeq ($(ARCH), x86_64)
	make docker:pull DOCKER_URI=$(GRC_UI_API_DOCKER_URI)
	docker image ls -a
	make docker:run DOCKER_NETWORK_OP=$(DOCKER_NETWORK_OP) DOCKER_NETWORK=$(DOCKER_NETWORK) DOCKER_IP_OP=$(DOCKER_IP_OP) DOCKER_IP=$(GRC_UI_API_DOCKER_IP) DOCKER_CONTAINER_NAME=$(GRC_UI_API_DOCKER_CONTAINER_NAME) DOCKER_BIND_PORT=$(GRC_UI_API_DOCKER_BIND_PORT) DOCKER_IMAGE=$(GRC_UI_API_DOCKER_URI) DOCKER_BUILD_TAG=$(RELEASE_TAG)
	npm install selenium-standalone@6.16.0 nightwatch@0.9.21
ifeq ($(A11Y_TESTS), TRUE)
	nightwatch
else
	nightwatch --env no-a11y
endif
endif
endif

.PHONY: push
push:
	make docker:login DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY)
	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY) DOCKER_TAG=$(SCRATCH_TAG)
	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY) DOCKER_TAG=$(SCRATCH_TAG)

.PHONY: release
release:
	make docker:login
	make docker:tag-arch
	make docker:push-arch
ifeq ($(ARCH), x86_64)
	make docker:tag-arch DOCKER_TAG=$(RELEASE_TAG_RED_HAT)
	make docker:push-arch DOCKER_TAG=$(RELEASE_TAG_RED_HAT)
endif
