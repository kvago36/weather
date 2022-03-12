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