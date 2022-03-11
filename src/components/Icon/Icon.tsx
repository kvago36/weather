import styled from 'styled-components'

type Props = {
  size: number,
  color?: string
}

const Icon = styled.i<Props>`
  color: ${props => props.color ? props.color : props.theme.colors.purple};
  font-size: ${(props: Props) => props.size}px;
`

export default Icon