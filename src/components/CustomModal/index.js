import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { styles, Container } from './styles';

Modal.setAppElement('#root');

class CustomModal extends Component {
  static propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
  };

  componentDidMount() {}

  render() {
    const {
      modalIsOpen, title, placeholder, closeModal, onSubmitForm, inputName,
    } = this.props;
    return (
      <Modal isOpen={modalIsOpen} style={styles}>
        <Container>
          <strong>{title}</strong>
          <form onSubmit={onSubmitForm}>
            <input name={inputName} placeholder={placeholder} />
            <div>
              <button type="button" onClick={closeModal} className="cancel">
                Cancelar
              </button>
              <button type="submit" className="save">
                Salvar
              </button>
            </div>
          </form>
        </Container>
      </Modal>
    );
  }
}

export default CustomModal;
