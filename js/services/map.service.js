const GEOCODE_API_KEY = 'AIzaSyAaeVqcfMAlJj1ZQfNXP9pkOBtojwlJwnQ'
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getPlacePos
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi().then(() => {
        console.log('google available')
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })

        // infoWindow.open(gMap)
        gMap.addListener('click', (mapsMouseEvent) => {
            // Close the current InfoWindow.
            //   infoWindow.close()
            // Create a new InfoWindow.
            getPlaceData(mapsMouseEvent.latLng).then((place) => console.log(place))
            //   infoWindow = new google.maps.InfoWindow({
            //     position: mapsMouseEvent.latLng,
            //   })
            //   infoWindow.setContent(
            //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
            //   )
            //   infoWindow.open(gMap)
        })
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    })
    panTo(loc.lat, loc.lng)
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAO7yp1xijauLBLNDaJaB_A_uo0NY_IvfI'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getPlacePos(term) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${GEOCODE_API_KEY}`
    return axios.get(url).then((res) =>
        res.data.results[0].geometry.location
    )
}
