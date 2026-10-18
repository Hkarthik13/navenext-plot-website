import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Project } from '../../types';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/formatters';

interface LeafletCityMapProps {
  projects: Project[];
  center?: [number, number];
  zoom?: number;
  selectedProjectId?: string;
  onSelectProject?: (project: Project) => void;
  className?: string;
}

export const LeafletCityMap: React.FC<LeafletCityMapProps> = ({
  projects,
  center = [12.9716, 77.5946], // Default Bangalore / South India
  zoom = 6,
  selectedProjectId,
  onSelectProject,
  className = 'h-[500px] w-full'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // OpenStreetMap public tiles (100% Free, No API key needed)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const bounds: L.LatLngBounds = L.latLngBounds([]);

    projects.forEach((project) => {
      if (!project.coordinates) return;

      const isSelected = project.id === selectedProjectId;
      bounds.extend(project.coordinates);

      // Custom SVG Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            position: relative;
            transform: translate(-50%, -100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          ">
            <div style="
              background: ${isSelected ? '#c5a059' : '#0f2e22'};
              color: ${isSelected ? '#0a1f17' : '#ffffff'};
              border: 2px solid ${isSelected ? '#ffffff' : '#c5a059'};
              padding: 4px 8px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span>${project.name}</span>
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid ${isSelected ? '#c5a059' : '#0f2e22'};
              margin-top: -1px;
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker(project.coordinates, { icon: customIcon });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 240px; padding: 2px;">
          <img src="${project.heroImage}" alt="${project.name}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 2px 0; color: #0f2e22;">${project.name}</h4>
          <p style="font-size: 11px; color: #55635c; margin: 0 0 6px 0;">${project.locality}, ${project.cityName}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px;">
            <span style="font-weight: 700; color: #0f2e22;">${project.priceRangeText}</span>
            <span style="background: #e5ece8; color: #163e2f; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;">${project.totalPlots} Plots</span>
          </div>
          <a href="/projects/${project.slug}" style="display: block; text-align: center; background: #0f2e22; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">
            View Interactive Layout &rarr;
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onSelectProject) {
          onSelectProject(project);
        }
      });

      markersGroup.addLayer(marker);
    });

    if (projects.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, [projects, selectedProjectId]);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg border border-[#c2d1c9] ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};
