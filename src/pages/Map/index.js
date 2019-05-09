import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomModal from '../../components/CustomModal';
import { Creators as UserActions } from '../../store/ducks/users';

class Map extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        avatar: PropTypes.string,
        url: PropTypes.string,
        login: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    ).isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -25.44199,
      longitude: -49.26854,
      zoom: 14,
    },
    modalIsOpen: false,
    lastLat: null,
    lastLong: null,
    users: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(newProps) {
    const { users } = this.props;
    if (newProps.error) {
      toast(newProps.error, {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 1200,
      });
    } else if (newProps.users.length !== users.length) {
      this.setState({ users: newProps.users });
      if (newProps.users.length > users.length) {
        toast('Usuário adicionado com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.SUCCESS,
          autoClose: 1200,
        });
      } else {
        toast('Usuário removido com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.SUCCESS,
          autoClose: 1200,
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    this.setState({ modalIsOpen: true, lastLat: latitude, lastLong: longitude });
  };

  onNewUserAdded = async (name) => {
    this.setState({ modalIsOpen: false });
    const { addUserRequest } = this.props;
    const { lastLat, lastLong } = this.state;
    addUserRequest(name, lastLat, lastLong);

    this.setState({ lastLat: null, lastLong: null });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.get('userName')) {
      this.onNewUserAdded(data.get('userName'));
    }
  };

  renderMarkers = () => {
    const { users } = this.state;
    return users.map(user => (
      <Marker
        captureClick
        onClick={e => console.log(e)}
        key={user.id}
        latitude={user.latitude}
        longitude={user.longitude}
      >
        <img
          style={{
            borderRadius: 100,
            width: 48,
            height: 48,
            border: '4px solid #7159c1',
          }}
          src={user.avatar}
          alt={user.name}
        />
      </Marker>
    ));
  };

  render() {
    const { viewport, modalIsOpen } = this.state;
    return (
      <MapGL
        {...viewport}
        onClick={this.handleMapClick}
        onViewportChange={newViewport => this.setState({ viewport: newViewport })}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZ3VzdGF2b21zOTciLCJhIjoiY2p2ZHhpbDg4MGh5NjQzcDZremVrdnZiNyJ9.MoIxirq-kROcDI5_ogygWg"
        dragPan
      >
        {this.renderMarkers()}

        <CustomModal
          modalIsOpen={modalIsOpen}
          title="Adicionar novo usuário"
          placeholder="Usuário no Github"
          closeModal={() => this.setState({ modalIsOpen: false })}
          inputName="userName"
          onSubmitForm={e => this.onSubmitForm(e)}
        />
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  error: state.users.error,
  loading: state.users.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
