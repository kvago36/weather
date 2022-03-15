export type Coords = {
  lat: number,
  lon: number
}

export type City = {
  name: string,
  coords: Coords
}

export type SearchResult = {
  name: string;
  location: string;
  coordinates: Coords
}

type Weather = {
  description: string
  icon: string
  id: number
  main: string
}

type Wind = {
  speed: number;
}

type Main = {
  humidity: number;
  pressure: number;
  temp: number;
}

export type WeatherResponse = {
  main: Main;
  wind: Wind;
  weather: Weather[];
}

export type GeoResponse = {
  name: string,
  lat: number,
  lon: number,
  country: string,
  state?: string
}