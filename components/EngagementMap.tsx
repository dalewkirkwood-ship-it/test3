import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ACTIVITY_POINTS, ACTIVITY_COLORS } from '../constants';
import { Calendar, Users } from 'lucide-react';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icons in React
const DefaultIcon = L.icon({
  iconUrl: iconMarker,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons could be implemented here, for now we effectively just use the default blue one 
// or could construct custom DivIcons if we want the specific activity colors on the pins themselves.
// To keep it simple but colorful, let's use a simple colored dot DivIcon.

const createCustomIcon = (color: string) => new L.DivIcon({
  className: 'custom-icon',
  html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

export const EngagementMap: React.FC = () => {
  // Center of UK
  const position: [number, number] = [54.5, -3.0];

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner z-0">
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ACTIVITY_POINTS.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={createCustomIcon(ACTIVITY_COLORS[point.activityType])}
          >
            <Popup className="custom-popup">
              <div className="w-64 p-1">
                <h3 className="font-bold text-slate-900 mb-1">{point.locationName} Engagement</h3>
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-white mb-2"
                  style={{ backgroundColor: ACTIVITY_COLORS[point.activityType] }}
                >
                  {point.activityType}
                </span>
                <div className="flex items-center text-slate-500 text-sm mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  {point.participants} Participants
                </div>
                <div className="flex items-center text-slate-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {point.date}
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  {point.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-slate-200 max-w-[200px]">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Activity Type</h4>
        <div className="space-y-2">
          {Object.entries(ACTIVITY_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2 shadow-sm border border-white" style={{ backgroundColor: color }}></span>
              <span className="text-xs text-slate-700 font-medium">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};