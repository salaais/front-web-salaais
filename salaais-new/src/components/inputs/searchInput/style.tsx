import styled from 'styled-components';

export const All = styled.div`
display:flex;
justify-content:center;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width:300px;
  margin-bottom:100px;
`;

export const Input = styled.input`
  width: 100%;
  height:auto;
  margin: 0 auto; /* Center the input */
  background-color: var(--bg-secondary);
  padding: 2px 0px 0px 20px;
  color: var(--txt-primary);
  border-radius: 32px 0 0 32px;
  font-size: 16px;
  position: relative;

  &::placeholder {
    color: var(--txt-primary);
  }

  &:focus,
  &:valid {
    outline: none;
  }
`;
