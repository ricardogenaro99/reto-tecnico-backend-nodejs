const BASE_URL = 'https://swapi.py4e.com/api'

module.exports = {
  API: {
    BASE_URL: {
      URL: BASE_URL
    },
    FILM: {
      URL: `${BASE_URL}/films`,
      MAXIMUM_SIZE_PER_PAGE: 7,
      MAX_PAGES: 1
    },
    PEOPLE: {
      URL: `${BASE_URL}/people`,
      MAXIMUM_SIZE_PER_PAGE: 88,
      MAX_PAGES: 9
    },
    PLANET: {
      URL: `${BASE_URL}/planets`,
      MAXIMUM_SIZE_PER_PAGE: 61,
      MAX_PAGES: 7
    },
    SPECIE: {
      URL: `${BASE_URL}/species`,
      MAXIMUM_SIZE_PER_PAGE: 37,
      MAX_PAGES: 4
    },
    STARSHIP: {
      URL: `${BASE_URL}/starships`,
      MAXIMUM_SIZE_PER_PAGE: 29,
      MAX_PAGES: 4
    },
    VEHICLE: {
      URL: `${BASE_URL}/vehicles`,
      MAXIMUM_SIZE_PER_PAGE: 39,
      MAX_PAGES: 4
    }
  },
  TABLE: {
    NAME: 'ChallengeIndraTable'
  },
  LAMBDA: {
    BASE_URL: 'https://of39yj25b5.execute-api.us-east-1.amazonaws.com'
  }
}
