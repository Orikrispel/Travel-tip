import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onDeleteLoc = onDeleteLoc
window.onGetUserPos = onGetUserPos
window.renderPlacesList = renderPlacesList

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

function renderPosByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const pos = queryStringParams.get('pos')
  if (!pos) return
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  // console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

// From placeKeeper:
function onDeleteLoc(elBtn) {
  const placeId = elBtn.dataset.id
  locService
    .remove(placeId)
    .then(locService.query().then((locs) => console.log(locs)))

  //   locService.query().then((locs) => {
  //     console.log('Locations:', locs)
  // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  //   })
}

// From placeKeeper:
function renderPlacesList(locs) {
  console.log(locs)
  const list = document.querySelector('.places-list')
  let strHTMLs = []
  strHTMLs = locs.map(
    (loc) => `<div class="place-container">${loc.name}
      <button class="btn-pan" data-id="${loc.id}" onclick="onPanTo(this)">Go</button>
      <div class="btn-delete" data-id="${loc.id}" onclick="onDeleteLoc(this)">✗</div>
    </div>`
  )
  list.innerHTML = strHTMLs.join('')
}

function onGetLocs() {
  locService.query().then((locs) => {
    // console.log('Locations:', locs)
    renderPlacesList(locs)
    // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      // console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo(elBtn) {
  const placeId = elBtn.dataset.id
  locService
    .get(placeId)
    .then((place) => mapService.panTo(place.pos.lat, place.pos.lng))
}
