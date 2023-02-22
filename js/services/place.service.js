import { storageService } from './services/async-storage.service.js'
import { utilService } from './service/util.service.js'
const PLACES_STORAGE_KEY = 'placesDB'

function _createPlaces() {
  let places = util.get(PLACES_STORAGE_KEY, places.id)
  if (!places || !places.length) {
    _createDemoPlaces()
  }
}
