import styled from 'styled-components'


const Logo = () => {
  return (
    <LogoContainer>
      <Line />
      <Circle>
        <InnerCirce>

        </InnerCirce>
      </Circle>
      <Line />
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  margin-bottom: 32px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  border: 1px solid ${props => props.theme.colors.purple};
  background-color: transparent;
  flex: 0 0 48px;
  margin: 0 16px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InnerCirce = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.purple};
`

const Line = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.gray300};
  height: 1px;
`

export default Logo 