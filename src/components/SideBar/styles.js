import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 350px;
  height: 95%;
  z-index: 1;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 3px;

  div {
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: auto;

    .data-container {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid lightgrey;
      justify-content: space-between;
      padding: 0;

      .user-container {
        display: flex;
        flex-direction: row;

        .user-data-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0;
          margin-left: 5px;
          strong {
            font-size: 15px;
          }

          p {
            font-size: 12px;
          }
        }
      }

      .user-actions {
        display: flex;
        justify-content: space-around;
        font-size: 12px;

        button {
          border: 0;
          cursor: pointer;
        }
      }
    }
  }
`;
