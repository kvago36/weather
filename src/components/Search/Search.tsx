import { useState } from 'react'
import styled from 'styled-components'

import Icon from '../Icon/Icon'

import useThrottle from '../../hooks/useThrottle'

import { SearchResult } from '../../types'

import SearchList from './SearchList'

type Props = {
  onAdd: (city: SearchResult) => void,
  className?: string
}

const Search = ({ onAdd, className }: Props) => {
  const [value, setValue] = useState<string>('')
  const throttledValue = useThrottle<string>(value)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

  const addCity = (city: SearchResult) => {
    setValue('')
    onAdd(city)
  }

  return (
    <SearchWrapper className={className}>
      <SearchInput placeholder="Search" value={value} onChange={handleChange} />
      <SearchButton>
        <SearchIcon size={18} className='icon-search' />
      </SearchButton>

      {
        throttledValue && (
          <SearchResults>
            <SearchList value={throttledValue} onAdd={addCity} />
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
  width: calc(100% - 48px);
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

export default Search