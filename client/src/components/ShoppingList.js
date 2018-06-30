import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition classNames="fade" key={id} timeout={500}>
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteItem.bind(this, id)}>
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
