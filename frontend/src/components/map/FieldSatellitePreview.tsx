"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { WellSummary } from "../../data/types";

interface FieldSatellitePreviewProps {
  wells: WellSummary[];
  /** Called when the map is clicked (Overview uses it to open the full Map tab). */
  onOpen?: () => void;
  className?: string;
}

const STATUS_COLOR: Record<string, string> = {
  producing: "#2ECC71",
  css_active: "#FF7A45",
  alarm: "#FF4D4F",
  shut_in: "#CBD5E1",
};

/**
 * Non-interactive satellite preview of the field. Uses the same free Esri World Imagery
 * tiles (no API key) as the Map tab's "Satellite" layer.
 */
export function FieldSatellitePreview({ wells, onOpen, className = "relative" }: FieldSatellitePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const LRef = useRef<any>(null);

  // Create the map once
  useEffect(() => {
    let mounted = true;
    import("leaflet").then((L) => {
      if (!mounted || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: [27.8145, 72.423], // Baghewala Field
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(map);
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(map);

      // PML lease boundary (same polygon as the Map tab)
      L.polygon(
        [[27.828, 72.405], [27.829, 72.445], [27.802, 72.448], [27.801, 72.408]],
        { color: "#FFB020", weight: 2, opacity: 0.95, dashArray: "6, 6", fillColor: "#FFB020", fillOpacity: 0.06 }
      ).addTo(map);

      mapRef.current = map;
      // Container may still be settling its size
      setTimeout(() => map.invalidateSize(), 50);
      map.fire("tp-ready");
    });

    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // (Re)draw well markers whenever wells change or the map becomes ready
  useEffect(() => {
    let cancelled = false;
    const draw = () => {
      const map = mapRef.current;
      const L = LRef.current;
      if (cancelled || !map || !L) return false;

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      wells.forEach((w) => {
        const color = STATUS_COLOR[w.status] || "#CBD5E1";
        const icon = L.divIcon({
          className: "",
          iconSize: [0, 0],
          html: `
            <div style="position:relative;transform:translate(-50%,-50%);display:flex;align-items:center;gap:4px;white-space:nowrap">
              <span style="flex:none;box-sizing:border-box;width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 0 2px ${color}66,0 2px 6px rgba(0,0,0,.5)"></span>
              <span style="font:700 10px/1 'IBM Plex Mono',monospace;color:#fff;background:rgba(10,20,35,.78);padding:2px 4px;border-radius:4px">${w.name.replace(/^BGW-/, "")}</span>
            </div>`,
        });
        markersRef.current.push(L.marker([w.lat, w.lon], { icon, interactive: false }).addTo(map));
      });

      if (wells.length > 0) {
        const bounds = L.latLngBounds(wells.map((w) => [w.lat, w.lon] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16, animate: false });
      }
      return true;
    };

    if (!draw()) {
      // Map not created yet — wait for it
      const t = setInterval(() => { if (draw()) clearInterval(t); }, 150);
      return () => { cancelled = true; clearInterval(t); };
    }
    return () => { cancelled = true; };
  }, [wells]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={containerRef} className="absolute inset-0 z-0 bg-slate-700" />
      {/* Click-through layer: keeps the preview from being dragged and opens the full map */}
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open interactive fleet map"
        className="absolute inset-0 z-[500] cursor-pointer bg-transparent"
      />
    </div>
  );
}
