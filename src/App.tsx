import { useState} from 'react'
import styled, { ThemeProvider  } from 'styled-components'

import Card from './components/Card/Card';
import Search from './components/Search/Search'
import Logo from './components/Logo/Logo'

import theme from './theme'
import { City, SearchResult } from './types';

import { citiesMocks } from './mocks'

function App() {
  const [cities, setCities] = useState<City[]>(citiesMocks)

  const addCity = (city: SearchResult) => {
    const payload: City = {
      name: `${city.name}, ${city.location}`,
      coords: city.coordinates
    }

    if (cities.find((item: City) => item.name === payload.name)) {
      return
    }

    setCities(value => value.concat([payload]))
  }

  const deleteCity = (name: string) => {
    setCities(value => value.filter((item: City) => item.name !== name))
  }

  return (
    <ThemeProvider theme={theme}>
      <Section>
        <Logo />
        <Header>
          <Title>Weather forecast</Title>
          <Description>Simple but powerful weather forcasting service based on OpenWeatherMap API</Description>
        </Header>
        <CardsList>
          <SearchWidget onAdd={addCity} />

          {
            cities.map((city: City) => <Card key={city.name} name={city.name} onIconClick={deleteCity} { ...city.coords } />)
          }
        </CardsList>
      </Section>
    </ThemeProvider>
  );
}

const Section = styled.section`
  max-width: 994px;
  position: relative;
  margin: 24px auto;

  @media (max-width: 1024px) {
    max-width: 752px;
  }

  @media (max-width: 840px) {
    padding: 0 24px 24px 24px;
    margin-bottom: 0;
  }
`
const Header = styled.header`
  display: block;
`

const SearchWidget = styled(Search)`
  position: absolute;
  top: -80px;
  right: 0;
  width: 352px;

  @media (max-width: 1024px) {
    width: 278px;
  }

  @media (max-width: 840px) {
    position: relative;
    width: 100%;
    top: 0;
  }
`

const CardsList = styled.main`
  display: grid;
  grid-template-columns: 480px 480px;
  column-gap: 32px;
  row-gap: 24px;
  position: relative;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 360px 360px;
  }

  @media (max-width: 840px) {
    grid-template-columns: 100%;
  }
`

const Title = styled.h2`
  font-family: Merriweather;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 36px;
  color: ${props => props.theme.colors.gray500};
`

const Description = styled.p`
  font-family: Merriweather;
  color: ${props => props.theme.colors.gray400};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin-top: 16px;
  width: 480px;
  line-height: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    width: 360px;
  }

  @media (max-width: 840px) {
    width: auto;
  }
`

export default App;
