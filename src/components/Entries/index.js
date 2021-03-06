/**
 * Created by hastings on 29/09/2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import './entries.css'

export default class Entries extends Component {
  render() {
    const listItems = []

    this.props.entries.forEach((d, i) => {
      listItems.push(
        <ListItem
          key={i}
          primaryText={
            <Entry deprecated={d.deprecated}>
              <EntryLabel {...d} />
              <EntryAPI {...d} />
            </Entry>
          }
        />
      )
    })

    return (
      <div className="entries">
        <List>
          <ListItem
            primaryText={<h3>{this.props.groupName}</h3>}
            secondaryText={<p>{this.props.groupDesc}</p>}
            initiallyOpen={false}
            primaryTogglesNestedList
            nestedItems={listItems}
          />
          <Divider />
        </List>
      </div>
    )
  }
}

class Entry extends Component {
  render() {
    return (
      <div className={this.props.deprecated ? 'entry deprecated' : 'entry'}>
        {this.props.children}
      </div>
    )
  }
}

class EntryLabel extends Component {
  render() {
    let root = 'entry-label'
    let type = this.props.type
    if (typeof type === 'string') {
      type = type.toLowerCase()
    }
    switch (type) {
      case 'post':
        return <div className={root + ' post'}>POST</div>
      case 'put':
        return <div className={root + ' put'}>PUT</div>
      case 'delete':
        return <div className={root + ' delete'}>DELETE</div>
      default:
        return <div className={root + ' get'}>GET</div>
    }
  }
}

class EntryAPI extends Component {
  render() {
    return (
      <div className="entry-api">
        <span className="api">{this.props.api}</span>
        <span className="desc">{this.props.desc}</span>
      </div>
    )
  }
}

Entries.propTypes = {
  groupName: PropTypes.string,
  groupDesc: PropTypes.string,
  entries: PropTypes.array.isRequired,
}
