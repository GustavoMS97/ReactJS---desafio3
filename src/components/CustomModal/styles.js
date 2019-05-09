import styled from 'styled-components';

export const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    zIndex: 2,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    align-self: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    height: 80px;
    input {
      flex: 1;
      width: 100%;
      align-self: center;
      height: 30px;
      padding: 0 20px;
      background: #fff;
      border: 1px solid lightgrey;
      font-size: 13px;
      color: #444;
      border-radius: 3px;
      margin-bottom: 10px;
    }

    div {
      display: flex;
      justify-content: space-between;

      button {
        height: 35px;
        flex: 1;
        color: #fff;
        border-radius: 3px;
      }

      .cancel {
        margin-right: 5px;
        background: lightgrey;
      }

      .save {
        margin-left: 5px;
        background: limegreen;
      }
    }
  }
`;
