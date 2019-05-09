import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Container } from './styles';
import { Creators as UserActions } from '../../store/ducks/users';

class SideBar extends Component {
  static propTypes = {
    removeUser: PropTypes.func.isRequired,
  };

  state = { users: [] };

  componentWillReceiveProps(newProps) {
    if (newProps.users) {
      this.setState({ users: newProps.users });
    }
  }

  renderUsers = () => {
    const { users } = this.state;
    const { removeUser } = this.props;
    return users.map(user => (
      <div key={user.id} className="data-container">
        <div className="user-container">
          <img
            src={user.avatar}
            alt={user.name}
            style={{ borderRadius: 100, width: 48, height: 48 }}
          />
          <div className="user-data-container">
            <strong>{user.name}</strong>
            <p>{user.login}</p>
          </div>
        </div>
        <div className="user-actions">
          <button type="button" onClick={() => removeUser(user.id)}>
            <i className="fa fa-times" />
          </button>
          <a href={user.url} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-chevron-right" />
          </a>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <Container>
        <div>{this.renderUsers()}</div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);
