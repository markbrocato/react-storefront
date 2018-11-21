/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { types, getParent } from "mobx-state-tree"
import { MenuItemModel } from './Menu'
import TabsRow from './TabsRow'
import withStyles from '@material-ui/core/styles/withStyles'
import Track from './Track'
import Link from './Link'
import { relativeURL } from './utils/url'
import Tab from '@material-ui/core/Tab'

/**
 * Scrollable navigation tabs for the top of the app. All extra props are spread to the 
 * underlying Material UI Tabs element.  When a tab is clicked, the "top_nav_clicked" analytics
 * event is fired.
 */
export const styles = theme => ({
  tabs: {
    maxWidth: theme.maxWidth,
    flex: 1,
  },
  tab: {
    height: '56px',
    fontWeight: 300,
    minWidth: '20px',
    position: 'relative'
  },
  selectedTab: {
    fontWeight: 500,
    opacity: 1
  },
  link: {
    display: 'block',
    height: '100%',
    fontSize: theme.typography.body1.fontSize
  },
  clickEl: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  root: {
    zIndex: theme.zIndex.appBar - 1,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 0,
    '&::before': {
      content: "''",
      top: 0,
      left: 0,
      width: '15px',
      height: 'calc(100% - 3px)',
      position: 'absolute',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',
      zIndex: 1,
    },
    '&::after': {
      content: "''",
      top: 0,
      right: 0,
      width: '15px',
      height: 'calc(100% - 3px)',
      position: 'absolute',
      background: 'linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',
      zIndex: 1,
    }
  }
});

@withStyles(styles)
@inject(({ app, history }) => ({ tabs: app.tabs, history }))
@observer
export default class NavTabs extends Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),

    /**
     * Controls the amount of drop shadow.
     */
    elevation: PropTypes.number
  }

  static defaultProps = {
    elevation: 2
  }

  render() {
    const { tabs, classes, staticContext, history, elevation, ...tabsProps } = this.props

    if (!tabs) return null

    const { selected } = tabs

    return (
      <Paper className={classes.root} elevation={elevation}>
        <TabsRow
          initialSelectedIdx={selected}
          onTabChange={this.handleChange}
          items={tabs.items}
          tabRenderer={this.renderTab}
          centered
          classes={{
            root: classes.tabs
          }}
          {...tabsProps}
        />
      </Paper>
    )
  }

  renderTab = (item, i) => {
    const { classes } = this.props

    return (
      <Track key={i} event="topNavClicked" item={item}>
        <Tab
          classes={{
            root: classes.tab,
            selected: classes.selectedTab
          }}
          label={
            <Link 
              state={() => item.state && JSON.parse(item.state)} 
              className={classes.link} 
              to={item.url} 
              prefetch={item.prefetch} 
              onClick={this.onLinkClick}
              data-th="topNavClicked"
            >
              {item.text}
            </Link>
          }
        />
      </Track>
    )
  }

  handleChange = (_event, newValue) => {
    const { tabs, history } = this.props
    const item = tabs.items[newValue]
    const url = relativeURL(item.url)

    analytics.topNavClicked

    if (history) {
      history.push(url, item.state && JSON.parse(item.state))
    } else {
      window.location.href = url
    }
  }

}

export const TabsModel = types
  .model("TabsModel", {
    items: types.array(MenuItemModel)
  })
  .views(self => ({
    get selected() {
      const { location } = getParent(self)
      const url = location.pathname + location.search
      const index = self.items.findIndex(item => item.url === url)
      return index === -1 ? null : index
    }
  }))
