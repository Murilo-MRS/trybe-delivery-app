import styled from 'styled-components';

const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
  input {
    padding: 1px 0;
    text-align: center;
    height: 2em;
    text: white;
    background-color: #CCCCCC;
    border-radius: 0.40em;
    outline: none;
    border: none;
    &:focus {
      outline: 2px solid #995bd5;
    }
  }
`;

export default LabelInput;
