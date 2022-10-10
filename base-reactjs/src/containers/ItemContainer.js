import React, { Component } from 'react'
import * as actions from '../actions/ItemAction'
import {connect} from 'react-redux'
import ItemComponent from '../components/ItemComponent'
class ItemContainer extends Component {
    componentDidMount() {
        this.props.paginateItem(1)
    }
  render() {
    return (
      <div>
        <ItemComponent {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
        items: state.items.listItem,
        totalPage: state.items.totalPage,
        textSearch: state.items.textSearch,
        activePage: state.items.activePage
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        paginateItem: (data) => {
            dispatch(actions.paginateRequest(data))
        },
        addItem: (data) => {
            dispatch(actions.addRequest(data))
        },
        deleteItem: (data) => {
            dispatch(actions.deleteRequest(data))
        },
        deleteOneItem: (data) => {
            dispatch(actions.deleteOneRequest(data))
        },
        updateItem: (data) => {
            dispatch(actions.updateRequest(data))
        },
        searchItem: (data) => {
            dispatch(actions.searchRequest(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)