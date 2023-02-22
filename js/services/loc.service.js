import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const PLACES_STORAGE_KEY = 'placesDB'

_createPlaces()

export const locService = {
    getLocs,
    query,
    get,
    remove,
    save
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
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
    let places = utilService.get(PLACES_STORAGE_KEY, places.id)
    if (!places || !places.length) {
        _createDemoPlaces()
    }
    return places
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



