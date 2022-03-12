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
      name: `${city.name} ${city.location}`,
      coords: city.coordinates
    }

    setCities(value => value.concat([payload]))
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
            cities.map((city: City) => <Card key={city.name} name={city.name} { ...city.coords } />)
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

  @media (max-width: 640px) {
    padding: 0 24px 24px 24px;
  }
`
const Header = styled.header`
  display: block;
`

const SearchWidget = styled(Search)`
  position: absolute;
  top: -80px;
  right: 0;
`

const CardsList = styled.div`
  display: grid;
  grid-template-columns: 480px  480px;
  column-gap: 32px;
  row-gap: 24px;
  position: relative;

  @media (max-width: 640px) {
    grid-template-columns: 480px;
    justify-items: center;
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
`

export default App;
