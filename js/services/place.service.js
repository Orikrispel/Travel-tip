import { storageService } from './services/async-storage.service.js'
import { utilService } from './service/util.service.js'
const PLACES_STORAGE_KEY = 'placesDB'

_createPlaces()

export const placeService = {
  query,
  get,
  remove,
  save,
}

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
  let places = util.get(PLACES_STORAGE_KEY, places.id)
  if (!places || !places.length) {
    _createDemoPlaces()
  }
}
