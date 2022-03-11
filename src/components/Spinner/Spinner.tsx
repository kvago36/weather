import styled, { keyframes } from 'styled-components'

const Spinner = () => <Container />

const rotate  = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: ${props => props.theme.colors.purple};
  background: linear-gradient(to right, #730641 10%, rgba(115,6,65, 0) 42%);
  position: relative;
  animation: ${rotate} 1.4s infinite linear;
  transform: translateZ(0);

  :before {
    width: 50%;
    height: 50%;
    background: ${props => props.theme.colors.purple};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  :after {
    background: ${props => props.theme.colors.white};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export default Spinner