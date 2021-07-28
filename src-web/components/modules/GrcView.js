/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateAvailableFilters, updateActiveFilters } from '../../actions/common'
import { GRC_VIEW_STATE_COOKIE, GRC_FILTER_STATE_COOKIE } from '../../utils/constants'
// eslint-disable-next-line import/no-named-as-default
import GrcCardsModule from '../modules/GrcCardsModule'
import GrcToggleModule from '../modules/GrcToggleModule'
import {
  filterPolicies, getAvailableGrcFilters, combineResourceFilters
} from '../../utils/filter-helper'
import NoResource from '../common/NoResource'
import { createDocLink, createDetails } from '../common/CreateDocLink'
import ResourceFilterBar from '../common/ResourceFilterBar'
import { checkCreatePermission } from '../../utils/CheckUserPermission'
import msgs from '../../nls/platform.properties'
import _ from 'lodash'
import queryString from 'query-string'
import config from '../../../server/lib/shared/config'
import {
  getSessionState, saveSessionState, addSessionPair
} from '../../utils/AccessStorage'

export class GrcView extends React.Component {

  constructor (props) {
    super(props)
    this.state= {
      viewState: getSessionState(GRC_VIEW_STATE_COOKIE)
    }
    this.scroll = _.debounce(()=>{
      this.scrollView()
    }, 50)
    this.onUnload = this.onUnload.bind(this)
    window.addEventListener('beforeunload', this.onUnload)
    this.handleCreatePolicy = this.handleCreatePolicy.bind(this)
    this.updateViewState = this.updateViewState.bind(this)
    this.handleDrillDownClickGrcView = this.handleDrillDownClickGrcView.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { activeFilters={} } = this.props
    //get (activeFilters ∪ storedFilters) only since availableGrcFilters is uninitialized at this stage
    //later when availableGrcFilters initialized, will do further filtering in UNSAFE_componentWillReceiveProps
    const combinedFilters = combineResourceFilters(activeFilters, getSessionState(GRC_FILTER_STATE_COOKIE))
    //update sessionStorage
    saveSessionState(GRC_FILTER_STATE_COOKIE, combinedFilters)
    //update active filters
    updateActiveFilters(combinedFilters)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      items,
      updateAvailableFilters: localUpdateAvailableFilters,
      updateActiveFilters: localUpdateActiveFilters,
    } = nextProps

    if (!_.isEqual(items, this.props.items)) {
      const { locale } = this.context
      const displayType = location.pathname.split('/').pop()
      //if url has severity special para, store it into sessionStorage before updating active filters
      const urlParams = queryString.parse(location.search)
      if (urlParams.severity) {
        addSessionPair(GRC_FILTER_STATE_COOKIE, 'severity', urlParams.severity)
      }

      let availableGrcFilters
      switch(displayType) {
      case 'all':
      default:
        availableGrcFilters = getAvailableGrcFilters(items, locale)
        break
      }
      localUpdateAvailableFilters(availableGrcFilters)
      const activeFilters = _.cloneDeep(nextProps.activeFilters||{})
      //get (activeFilters ∪ storedFilters) ∩ availableGrcFilters
      const combinedFilters = combineResourceFilters(activeFilters, getSessionState(GRC_FILTER_STATE_COOKIE), availableGrcFilters)
      //update sessionStorage
      saveSessionState(GRC_FILTER_STATE_COOKIE, combinedFilters)
      //update active filters
      localUpdateActiveFilters(combinedFilters)
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scroll)
  }

  componentDidUpdate() {
    const urlParams = queryString.parse(location.search)
    if (urlParams.autoFocus && document.getElementsByClassName(urlParams.autoFocus)[0]) {
      const ref = document.getElementsByClassName(urlParams.autoFocus)[0].offsetTop
      window.scrollTo({
        top: ref,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll)
    window.removeEventListener('beforeunload', this.onUnload)
    this.onUnload()
  }

  render() {
    const { locale } = this.context
    const { viewState } = this.state
    const {
      items, activeFilters={}, location, access, history
    } = this.props
    const refetch = items.refetch

    const displayType = location.pathname.split('/').pop()
    let filterGrcItems, filterToEmpty = false
    const showCreationLink = checkCreatePermission(access)
    switch(displayType) {
    case 'all':
    default:
      if (!items || items.length === 0) {
        return (
          <NoResource
            title={msgs.get('no-resource.title', [msgs.get('routes.grc', locale)], locale)}
            detail={
              createDetails(msgs.get('no-resource.detail.policy_pt1', locale),
                msgs.get('routes.create.policy', locale).toLowerCase(),
                msgs.get('no-resource.detail.policy_pt2', locale))
            }
            svgName='EmptyPagePlanet-illus.png'>
            {createDocLink(locale, this.handleCreatePolicy, msgs.get('routes.create.policy', locale), showCreationLink)}
          </NoResource>
        )
      }
      else {
        filterGrcItems = filterPolicies(items, activeFilters, locale, 'metadata.annotations')
        if (items.length > 0 && filterGrcItems.length === 0) {
          filterToEmpty = true
        }
      }
      break
    }
    if (refetch) {
      filterGrcItems.refetch = refetch
    }

    const urlParams = queryString.parse(location.search)
    const showGrcCard = urlParams.card==='false' ? false : true
    const grcTabToggleIndex = urlParams.index ? Number(urlParams.index) : 0
    const showGrcTabToggle = urlParams.toggle==='false' ? false : true
    return (
      <div className='grc-view'>
        <ResourceFilterBar />
        <GrcCardsModule
          displayType={displayType}
          viewState={viewState}
          updateViewState={this.updateViewState}
          grcItems={filterGrcItems}
          activeFilters={activeFilters}
          showGrcCard={showGrcCard}
          handleDrillDownClick={this.handleDrillDownClickGrcView}
        />
        <GrcToggleModule
          history={history}
          grcItems={filterGrcItems}
          grcTabToggleIndex={grcTabToggleIndex}
          showGrcTabToggle={showGrcTabToggle}
          filterToEmpty={filterToEmpty}
          handleToggleClick={this.handleToggleClick}
        />
      </div>
    )
  }

  updateViewState(states) {
    this.setState(prevState=>{
      return {viewState:  Object.assign(prevState.viewState, states)}
    })
  }

  scrollView () {
    const headerRef = document.getElementsByClassName('secondary-header')[0]
    const contentRef = document.getElementsByClassName('grc-view')[0]
    if (headerRef && contentRef) {
      const contentRect = contentRef.getBoundingClientRect()
      headerRef.classList.toggle('bottom-border', contentRect.top<180)
    }
  }

  onUnload() {//saved grc view ui setting
    saveSessionState(GRC_VIEW_STATE_COOKIE, this.state.viewState)
  }

  handleDrillDownClickGrcView(key, value, type, level){
    //step 1 add activeFilters when click GrcCardsModule
    //here for severity level, will not update filter here but just update url
    //then acutally update it in UNSAFE_componentWillReceiveProps()
    const {updateActiveFilters:localUpdateActiveFilters} = this.props
    //lodash recursively deep clone
    const activeFilters = _.cloneDeep(this.props.activeFilters||{})
    let activeSet
    if (value) { //add non-null grc-card filter
      //covert filter name on policy card to start case to match
      if (!activeFilters[key]) {
        activeFilters[key] = new Set()
      }
      activeSet = activeFilters[key]
      activeSet.add(value)
    }
    if (level) { //add non-null severity level filter
      if (!activeFilters[type]) {
        activeFilters[type] = new Set()
      }
      activeSet = activeFilters[type]
      activeSet.add(level)
    }
    if (activeSet && activeSet.size > 0 && saveSessionState && localUpdateActiveFilters) {
      saveSessionState(GRC_FILTER_STATE_COOKIE, activeFilters)
      localUpdateActiveFilters(activeFilters)
    }

    //step 2 update url when click GrcCardsModule
    const paraURL = {
      card: false,
      toggle: false,
    }
    if (type && type.toLowerCase()==='cluster') {
      paraURL.index=1
    } else {
      paraURL.index=0
    }
    let urlString = queryString.stringify(paraURL)
    //also append GrcToggleModule search input filter to the end of url if existing
    const curentURL = queryString.parse(location.search)
    if(curentURL.filters && curentURL.filters!==''){
      urlString = `${urlString}&filters=${curentURL.filters}`}
    if (this.props.history) {
      this.props.history.push(`${this.props.location.pathname}?${urlString}`)}
    return urlString
  }

  handleCreatePolicy(){
    this.props.history.push(`${config.contextPath}/create`)
  }

  handleToggleClick = (isSelected, event) => {
    if (isSelected) {
      const urlParams = queryString.parse(location.search)
      switch(event.currentTarget.id) {
      case 'grc-policies-view':
        urlParams.index = 0
        break
      case 'grc-cluster-view':
      default:
        urlParams.index = 1
        break
      }
      if (this.props.history) {
        this.props.history.push(`${this.props.location.pathname}?${queryString.stringify(urlParams)}`)}
    }
  }
}

GrcView.propTypes = {
  access: PropTypes.array,
  activeFilters: PropTypes.object,
  history: PropTypes.object.isRequired,
  items: PropTypes.array,
  location: PropTypes.object,
  updateActiveFilters: PropTypes.func,
  updateAvailableFilters: PropTypes.func,
}

const mapStateToProps = (state) => {
  const {
    resourceToolbar: {activeFilters},
    userAccess
  } = state
  const access = userAccess && userAccess.access ? userAccess.access : []
  return { activeFilters, access}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAvailableFilters: (availableFilters) => dispatch(updateAvailableFilters(availableFilters)),
    updateActiveFilters: (activeFilters) => dispatch(updateActiveFilters(activeFilters))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GrcView))
