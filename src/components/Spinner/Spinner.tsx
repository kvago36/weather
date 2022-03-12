import styled, { keyframes } from 'styled-components'

type Props = {
  className?: string;
}

const Spinner = ({ className }: Props) => <Container className={className} />

const rotate  = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div<Props>`
  margin: 0 auto;
  width: 20px;
  height: 20px;
  position: relative;
  animation: ${rotate} 1s infinite linear;
  border: 2px solid rgba(115, 6, 65, 0.25);
  border-top: 2px solid ${props => props.theme.colors.purple};
  border-right: 2px solid ${props => props.theme.colors.purple};
  border-bottom: 2px solid ${props => props.theme.colors.purple};
  border-radius: 50%;
`

export default Spinner