mapboxgl.accessToken = 'pk.eyJ1IjoiamlnbWUiLCJhIjoiY2tjOTM5a3EzMWhkMjJ5bWc0ZjRrazA4NyJ9.7gVQ-PWLYFWm7RSNcqj0gg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [0, 0], // starting position [lng, lat]
    zoom: 1.2 // starting zoom
});

var nav = new mapboxgl.NavigationControl({
    visualizePitch: true
  });
map.addControl(nav, 'top-left');

async function getData(){
    try{
        let response = await fetch('./data.json');
        let json = response.json();
        return json;
    }catch(error){
        console.log('error, fetching the data');
    }
}
getData().then(result=>{
    let data = result.student;
    data.forEach(res=>{
        let country = res.country;
         let latitude = res.lat; 
         let longitude = res.long; 
         let studentCount = res.numberOfStudent; 
         let flag = res.flag;

         //marker
         var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              },
              properties: {
                title: country,
                description: `<br><br><img src="${flag}"> <br>Number Of Student: ${studentCount}<br><br>`,
              }
            }]
          };
        
        geojson.features.forEach(marker =>{
            var el = document.createElement('div');
            el.className = 'marker';

            if(studentCount >= 50 && studentCount <= 100){
                el.style.height = "30px";
                el.style.width = "30px";
            }else if(studentCount >= 100 && studentCount <= 200){
                el.style.height = "35px";
                el.style.width = "35px";
            }else if(studentCount >= 200 && studentCount <= 400){
                el.style.height = "40px";
                el.style.width = "40px";
            } else if(studentCount > 400 && studentCount <= 1000 ){
                el.style.height = '45px';
                el.style.width = '45px';
            } else if(studentCount >= 1000 && studentCount <= 2000){
                el.style.height = '50px';
                el.style.width = '50px';
            } else if( studentCount >= 2000){
                el.style.height = '70px';
                el.style.width = '70px';
            }
            
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ 
                offset: 25,
                maxWidth: 100,
                maxHeight:100
            })
            .setHTML('<h2>' + marker.properties.title + '</h2> <h3>' + marker.properties.description + '</h3>'))
            .addTo(map);
        
        });
        let dataTable = document.querySelector('.table-data');
let row = dataTable.insertRow(0);
let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);
let cell3 = row.insertCell(2);
cell1.style.width = '10rem';
cell1.style.textAlign = 'center';
let img = document.createElement('img');
img.src = `${flag}`;
img.style.width = '80px';
img.style.height = '70px';
cell1.appendChild(img);  

cell2.innerHTML = `${country}`;
cell3.innerHTML = `${studentCount}`;
});
});

window.addEventListener('scroll', ()=>{
    let thead = document.querySelector('.head');
    if(window.pageYOffset > 1018){
        thead.style.position = 'fixed';
        // thead.style.height = '5rem';
        thead.style.top = '0';
    }else{
        thead.style.position = 'static'
    }
})



