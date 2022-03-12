import useSWR from 'swr'
import styled from 'styled-components'

import { get } from '../../fetcher' 

import { Coords } from '../../types'

import { API_KEY, API_REFRESH_RATE } from '../../constants'

import Spinner from '../Spinner/Spinner'
import Icon from '../Icon/Icon'

import weather from './weather.svg';

interface Props extends Coords {
  name: string;
  onIconClick: (name: string) => void;
}

const Card = (props: Props) => {
  const { data, error } = useSWR(`/weather?units=metric&lat=${props.lat}&lon=${props.lon}&appid=${API_KEY}`, get, { refreshInterval: API_REFRESH_RATE })

  if (error) return <Container>ошибка загрузки</Container>
  if (!data) return <Container>загрузка...</Container>

  return (
    <Container>
      <CityName>{props.name}</CityName>

      {
        !data && <Spinner />
      }

      {
        error && <p>ошибка загрузки</p>
      }

      <DeleteButton onClick={() => props.onIconClick(props.name)}><Icon size={18} color="#272525" className="icon-delete" /></DeleteButton>

      <TemperatureWrapper>
        <Temperature>{Math.round(data.main.temp)}<TemperatureCircle />C</Temperature>
        <img width={48} height={48} src={weather} alt="weather" />
      </TemperatureWrapper>

      <Label>Broken clouds</Label>
      
      <Line />

      <IconsList>
        <IconWrapper>
          <Icon size={20} className="icon-wind" /><IconText>{`${data.wind.speed} m/s`}</IconText>
        </IconWrapper>

        <IconWrapper>
          <Icon size={20} className="icon-humidity" /><IconText>{data.main.humidity}%</IconText>
        </IconWrapper>

        <IconWrapper>
          <Icon size={20} className="icon-pressure" /><IconText>{`${data.main.pressure} hPa`}</IconText> 
        </IconWrapper>
      </IconsList>

    </Container>
  )
}

const CityName = styled.h4`
  font-family: ${props => props.theme.fonts.text};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.08em;
  margin-top: 0;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.purple};
  text-transform: uppercase;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 24px;
  border-radius: 50%;
  cursor: pointer;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all .2s ease-in;
`

const TemperatureWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`

const Temperature = styled.span`
  color: ${props => props.theme.colors.gray500};
  font-family: ${props => props.theme.fonts.text};
  font-size: 48px;
  line-height: 100%;
`

const TemperatureCircle = styled.span`
  height: 7px;
  width: 7px;
  background-color: transparent;
  border-radius: 50%;
  display: inline-block;
  border: 3px solid ${props => props.theme.colors.gray500};
  top: 5px;
  margin-bottom: 21px;
`

const IconText = styled.span`
  font-family: ${props => props.theme.fonts.text};
  padding-left: 6px;
  color: ${props => props.theme.colors.gray500};
  font-size: 16px;
  line-height: 24px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 37px;
`

const IconsList = styled.div`
  display: flex;
`

const Line = styled.hr`
  border-top: 1px solid ${props => props.theme.colors.gray200};
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 32px -32px 24px -32px;
`

const Label = styled.p`
  color: ${props => props.theme.colors.gray400};
  font-family: ${props => props.theme.fonts.text};
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  margin-bottom: 0;
`

const Container = styled.div`
  position: relative;
  background: ${props => props.theme.colors.white};
  border-radius: 24px;
  padding: 24px 32px;
  width: calc(100% - 64px);
`

export default Card