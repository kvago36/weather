import styled from 'styled-components'

import Icon from '../Icon/Icon'

type Props = {
  onChange: (event: any) => void,
  className?: string
}

const Search = ({ onChange, className }: Props) => {
  return (
    <SearchWrapper className={className}>
      <SearchInput placeholder="Search" onChange={onChange} />
      <SearchButton>
        <SearchIcon size={18} className='icon-search' />
      </SearchButton>
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

export default Search