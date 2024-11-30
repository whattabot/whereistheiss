import './style.css'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';


async function getISSposition() {
    try {
        const res = await fetch('http://api.open-notify.org/iss-now.json');
        if (res.ok) {
            return await res.json();
        } else {
            return 'There was an error: ' + res.statusText;
        }
    } catch (error:any) {
        return 'There was an error: ' + error.message;
    }
}


const map = L.map('map').setView([0, 0], 2);;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  
    maxZoom: 19,
    minZoom:2
}).addTo(map);
const Icon = L.icon({
    iconUrl: '/ISS.png',
    iconSize: [50,32],
    iconAnchor: [25,16],
   
});

const m = L.marker([0, 0],{icon:Icon}).addTo(map);
function marker(latitude: number, longitude: number) {
  
    
  m.setLatLng([latitude, longitude]);
    
    
}

setInterval(() => {
    getISSposition().then((position) => {
        console.log(position);
        marker(position.iss_position.latitude, position.iss_position.longitude);
    });
}, 1000*0.5);
