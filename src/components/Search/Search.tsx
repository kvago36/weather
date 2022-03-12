import { useState, useEffect } from 'react'
import styled from 'styled-components'

import Icon from '../Icon/Icon'
import Spinner from '../Spinner/Spinner'

import { searchResults } from '../../mocks'
import { SearchResult } from '../../types'

type Props = {
  onAdd: (event: any) => void,
  className?: string
}

const SPINNER_TIMEOUT: number = 200

const Search = ({ onAdd, className }: Props) => {
  const [value, setValue] = useState<string>('')
  const [fetching, setFetching] = useState<boolean>(true)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleChange = (event: any) => setValue(event.target.value)

  useEffect(() => {
    let timeout: number;

    if (!value) {
      return
    }

    if (!fetching) {
      setFetching(true)
    }

    timeout = window.setTimeout(showCities, SPINNER_TIMEOUT)

    return () => {
      clearTimeout(timeout)
    }

  }, [value])

  const addCity = (city: SearchResult) => {
    setValue('')
    setResults([])
    onAdd(city)
  }

  const showCities = () => {
    setResults(searchResults)
    setFetching(false)
  }

  return (
    <SearchWrapper className={className}>
      <SearchInput placeholder="Search" value={value} onChange={handleChange} />
      <SearchButton>
        <SearchIcon size={18} className='icon-search' />
      </SearchButton>

      {
        value && (
          <SearchResults>
            {
              fetching && (
                <NotFound>
                  <SearchSpinner />
                </NotFound>
              )
            }

            {
              value && !fetching && value.toLowerCase() !== 'moscow' && (
                <>
                  {
                    results.map(({ name, location, coordinates }: SearchResult) => (
                      <FoundItem key={`${name}, ${location}`}>
                        <ItemTitle>{`${name}, ${location}`}</ItemTitle>
                        <ItemCoords>{`${coordinates.lat} ${coordinates.lon}`}</ItemCoords>
                        <AddItem onClick={() => addCity({ name, location, coordinates })}>
                          <Icon size={20} className='icon-add' />
                        </AddItem>
                        <ItemLine />
                      </FoundItem>
                    ))
                  }
                </>
              )
            }

            {
              value && !fetching && value.toLowerCase() === 'moscow' && (
                <NotFound>
                  <NotFoundTitle>City called “London” was not found</NotFoundTitle>
                  <NotFoundSubTitle>Try different city name</NotFoundSubTitle>
                </NotFound>
              )
            }
          </SearchResults>
        )
      }

    </SearchWrapper>
  )
}

const SearchWrapper = styled.div`
  display: flex;
`

const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.purple};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 0;
  padding: 14px;
`

const SearchInput = styled.input`
  background: ${props => props.theme.colors.gray300};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 12px 16px;
  font-family: ${props => props.theme.fonts.text};
  border: 0;
  width: 272px;
  line-height: 24px;
  font-size: 16px;
  outline: none;

  ::-webkit-input-placeholder {
    color: ${props => props.theme.colors.gray400};
  }
`

const SearchIcon = styled(Icon)`
  color: ${props => props.theme.colors.white};
`

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

const SearchResults = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  min-height: calc(84px - 40px);
  right: 0;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 1px rgba(28, 7, 19, 0.2), 0px 6px 12px rgba(28, 7, 19, 0.1);
  width: 100%;
  z-index: 2;
  top: 64px;
  border-radius: 8px;
  transition: all .1s ease-in;
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

export default Search