mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [hotel.longitude,hotel.latitude], // starting position [lng, lat]
zoom: 10 // starting zoom
});

new mapboxgl.Marker()
   .setLngLat([hotel.longitude,hotel.latitude])
   .setPopup(
      new mapboxgl.Popup({offset: 25})
        .setHTML(
         `<h3>${hotel.name}</h3><p>${hotel.city}</p>`
        )
    )
    .addTo(map);

    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );

        map.addControl(new mapboxgl.NavigationControl());
 
       

    
//hotel.longitude,hotel.latitude
//-74.5, 40
//'pk.eyJ1Ijoid2ViYnJvcyIsImEiOiJja2o5enI5aWsyNDl1MnlucTBtaXlzY3o5In0.LPF_COzRlojiJbb4Sbflaw'