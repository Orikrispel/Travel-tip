import { utilService } from './services/util.service.js'
export const placeService = {

}

function _createDemoPlaces() {
  const placeNames = ['Tel Aviv', 'Haifa']
  const placePoses = [{ lat: 32.085300, lng: 34.781769 }, { lat: 32.794044, lng: 34.989571 }]

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
    pos: {
      lat,
      lng
    },
    weather: '',
    createdAt: Date.now(),
    updatedAt: ''
  }
}