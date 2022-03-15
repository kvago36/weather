import useSWR from 'swr'
import styled from 'styled-components'

import Spinner from '../Spinner/Spinner'
import Icon from '../Icon/Icon'

import { get } from '../../fetcher' 

import { SearchResult, GeoResponse } from '../../types'

import { API_KEY } from '../../constants'

type Props = {
  value: string,
  onAdd: (city: SearchResult) => void
}

const SearchList = ({ value, onAdd }: Props) => {
  const { data, error } = useSWR<GeoResponse[]>(`/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`, get)

  if (error) return (
    <NotFound>
      <NotFoundTitle>Oops... something broken <span role="img" aria-label="pensive face">😔</span></NotFoundTitle>
    </NotFound>
  )

  if (!data) return (
    <NotFound>
      <SearchSpinner />
    </NotFound>
  )

  if (data.length === 0) {
    return (
      <NotFound>
        <NotFoundTitle>City called “{value}” was not found</NotFoundTitle>
        <NotFoundSubTitle>Try different city name</NotFoundSubTitle>
      </NotFound>
    )
  }

  return (
    <>
      {
        data.map(({ name, lat, lon, country }: GeoResponse) => (
          <FoundItem key={`${name}, ${country}`}>
            <ItemTitle>{`${name}, ${country}`}</ItemTitle>
            <ItemCoords>{`${lat} ${lon}`}</ItemCoords>
            <AddItem onClick={() => onAdd({ name, location: country, coordinates: { lat, lon } })}>
              <Icon size={20} className='icon-add' />
            </AddItem>
            <ItemLine />
          </FoundItem>
        ))
      }
    </>
  )
}

const NotFound = styled.div`
  margin: 0 auto;
  padding: 20px 0;
`

const SearchSpinner = styled(Spinner)`
  margin: 10px 0;
`

const NotFoundTitle = styled.h4`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  font-family: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.gray500};
`

const NotFoundSubTitle = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  font-family: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.gray400};
`

const AddItem = styled.button`
  position: absolute;
  top: 34px;
  right: 26px;
  border: 0;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
`

const ItemLine = styled.div`
  width: calc(100% - 50px);
  height: 1px;
  background-color: ${props => props.theme.colors.gray200};
  position: absolute;
  bottom: 0;
`

const ItemTitle = styled(NotFoundTitle)``

const ItemCoords = styled(NotFoundSubTitle)`
  text-align: start;
`

const FoundItem = styled.div`
  display: flex;
  position: relative;
  padding: 20px 24px;
  flex-flow: column;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.gray100};
  }

  &:last-child ${ItemLine} {
    display: none;
  }

  &:hover ${ItemCoords},
  &:hover ${ItemTitle} {
    color: ${props => props.theme.colors.purple};
  }
`

export default SearchList