import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const PLACES_STORAGE_KEY = 'placesDB'
const GEOCODE_API_KEY = 'AIzaSyAaeVqcfMAlJj1ZQfNXP9pkOBtojwlJwnQ'
export const locService = {
  //   getLocs,
  query,
  get,
  remove,
  save,
}

_createPlaces()

// const locs = [
//   { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//   { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
// ]

// function getLocs() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(locs)
//     }, 2000)
//   })
// }

function query() {
  return storageService.query(PLACES_STORAGE_KEY).then((places) => places)
}

function get(placeId) {
  return storageService.get(PLACES_STORAGE_KEY, placeId)
}

function remove(placeId) {
  return storageService.remove(PLACES_STORAGE_KEY, placeId)
}

function save(place) {
  if (place.id) {
    return storageService.put(PLACES_STORAGE_KEY, place)
  } else {
    return storageService.post(PLACES_STORAGE_KEY, place)
  }
}

function _createPlaces() {
  let places = utilService.loadFromStorage(PLACES_STORAGE_KEY)
  if (!places || !places.length) {
    _createDemoPlaces()
    places = utilService.loadFromStorage(places, PLACES_STORAGE_KEY)
  }
  return places
}

function _createDemoPlaces() {
  const placeNames = ['Tel Aviv', 'Haifa']
  const placePoses = [
    { lat: 32.0853, lng: 34.781769 },
    { lat: 32.794044, lng: 34.989571 },
  ]

  const places = placeNames.map((placeName, i) => {
    const place = _createPlace(placeName, placePoses[i])
    return place
  })
  utilService.saveToStorage(PLACES_STORAGE_KEY, places)
}

function _createPlace(name, pos) {
  return {
    id: utilService.makeId(),
    name,
    pos,
    weather: '',
    createdAt: Date.now(),
    updatedAt: '',
  }
}
