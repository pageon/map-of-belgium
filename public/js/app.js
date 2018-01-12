var center = new google.maps.LatLng(50.8, 4.5);
var zoom = 9;
var mapOptions = {
    zoom: zoom,
    center: center,
    mapTypeId: google.maps.MapTypeId.hybrid,
    backgroundColor: '#FFF',
    disableDefaultUI: true,
    draggable: true,
    scaleControl: true,
    scrollwheel: true,

    styles: [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#474747'
                }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#bdbdbd'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dadada'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#c9c9c9'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        }
    ]
};

function initialize() {
    const map = initializeMaps();

    initializeAutocomplete(map);
}

function initializeMaps() {
    const map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    const markers = [];
    const infowindows = [];

    function addMarker(church) {
        const marker = new google.maps.Marker({
            map: map,
            position: {'lat': church.lat, 'lng': church.lng}
        });

        const contentString = `
<div class="popup">
    <p>
        ${church.name}, <br>
        ${church.street}<br>
        ${church.postalCode} ${church.city}
    </p>

    <a href="#${church.name.replace(' ', '-').toLowerCase()}">
        Meer info
    </a>
</div>
                `;

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        infowindows.push(infowindow);

        marker.addListener('click', function () {
            infowindows.forEach(function (closing) {
                closing.close();
            });

            infowindow.open(map, marker);
        })

        markers.push(marker);
    }

    for (let church of churches) {
        if (!church || !church.lat || !church.lng) {
            continue;
        }

        addMarker(church);
    }

    new MarkerClusterer(map, markers, {
        imagePath: '/img/m',
        minimumClusterSize: 20
    });

    return map;
}

function initializeAutocomplete(map) {
    const address = document.getElementById('address');

    const options = {
        componentRestrictions: {country: ['be']}
    };

    const autocomplete = new google.maps.places.Autocomplete(address, options);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        map.panTo(place.geometry.location);
        map.setZoom(12);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
