/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';

const pharmacies = [
  { 
    id: 1, 
    title: 'CR Pharma - Gran Vía', 
    distance: '0.2 km', 
    address: 'Calle Gran Vía 25, Madrid',
    phone: '+34 91 234 56 78',
    hours: 'Lun-Sáb: 9:00-21:00 | Dom: 10:00-14:00',
    rating: 4.9,
    lat: 40.4203,
    lng: -3.7043
  },
  { 
    id: 2, 
    title: 'CR Pharma - Serrano', 
    distance: '1.5 km', 
    address: 'Calle Serrano 50, Madrid',
    phone: '+34 91 345 67 89',
    hours: 'Lun-Sáb: 9:00-21:00',
    rating: 4.7,
    lat: 40.4380,
    lng: -3.6886
  },
  { 
    id: 3, 
    title: 'CR Pharma - Callao', 
    distance: '2.1 km', 
    address: 'Plaza Callao 4, Madrid',
    phone: '+34 91 456 78 90',
    hours: 'Lun-Sáb: 9:00-21:30',
    rating: 4.8,
    lat: 40.4186,
    lng: -3.7068
  },
  { 
    id: 4, 
    title: 'CR Pharma - Atocha', 
    distance: '2.8 km', 
    address: 'Calle Atocha 89, Madrid',
    phone: '+34 91 567 89 01',
    hours: '24 horas',
    rating: 4.6,
    lat: 40.4086,
    lng: -3.6949
  },
];

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const madridCenter: [number, number] = [40.4168, -3.7038];

export default function Mapa() {
  const [selectedPharmacy, setSelectedPharmacy] = useState(pharmacies[0]);

  return (
    <div className="mapa-container">
      <MapContainer 
        center={madridCenter}
        zoom={13}
        className="map-leaflet"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pharmacies.map(pharmacy => (
          <Marker 
            key={pharmacy.id} 
            position={[pharmacy.lat, pharmacy.lng]}
            icon={customIcon as any}
            eventHandlers={{
              click: () => setSelectedPharmacy(pharmacy),
            }}
          >
            <Popup>
              <strong>{pharmacy.title}</strong>
              <br />{pharmacy.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-header">
        <h1 className="map-title">Encuentra tu Farmacia CR</h1>
        <p className="map-subtitle">{pharmacies.length} farmacias en Madrid</p>
      </div>

      <div className="pharmacy-sidebar">
        <div className="pharmacy-list-compact">
          {pharmacies.map(pharmacy => (
            <div 
              key={pharmacy.id} 
              className={`pharmacy-card-compact ${selectedPharmacy.id === pharmacy.id ? 'active' : ''}`}
              onClick={() => setSelectedPharmacy(pharmacy)}
            >
              <div className="pharmacy-card-icon">
                <MapPin size={18} />
              </div>
              <div className="pharmacy-card-content">
                <h3 className="pharmacy-name">{pharmacy.title}</h3>
                <p className="pharmacy-address">{pharmacy.address}</p>
                <div className="pharmacy-meta">
                  <span className="pharmacy-distance">
                    <MapPin size={12} /> {pharmacy.distance}
                  </span>
                  <span className="pharmacy-rating">
                    <Star size={12} fill="currentColor" /> {pharmacy.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pharmacy-detail-card">
          <div className="detail-header">
            <h2>{selectedPharmacy.title}</h2>
            <span className="detail-rating">
              <Star size={16} fill="currentColor" /> {selectedPharmacy.rating}
            </span>
          </div>
          <p className="detail-address">{selectedPharmacy.address}</p>
          
          <div className="detail-info">
            <div className="detail-item">
              <Clock size={16} />
              <span>{selectedPharmacy.hours}</span>
            </div>
            <div className="detail-item">
              <Phone size={16} />
              <span>{selectedPharmacy.phone}</span>
            </div>
          </div>

          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.lat},${selectedPharmacy.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navigate-btn-full"
          >
            <Navigation size={18} />
            Cómo Llegar
          </a>
        </div>
      </div>
    </div>
  );
}
