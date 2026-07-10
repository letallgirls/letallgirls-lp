"use client";

import React, { useState, useMemo, useEffect } from "react";
import { geoAzimuthalEqualArea, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import type { FeatureCollection, Geometry } from "geojson";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
  id?: string;
}

interface MapProps {
  locations?: MapLocation[];
  activeLocationId?: string | null;
  lineColor?: string;
}

export function WorldMap({
  locations = [],
  activeLocationId = null,
  lineColor = "#3a51aa", // Brave primary
}: MapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [geographies, setGeographies] = useState<any[]>([]);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((topojsonData) => {
        const { features } = feature(
          topojsonData,
          topojsonData.objects.countries
        ) as unknown as FeatureCollection<Geometry, any>;
        setGeographies(features);
      })
      .catch((err) => console.error("Error fetching map topology:", err));
  }, []);

  const activeLabel = useMemo(() => {
    if (hoveredLocation) return hoveredLocation;
    if (activeLocationId) {
      const activeLoc = locations.find((l) => l.id === activeLocationId);
      if (activeLoc) return activeLoc.label;
    }
    return null;
  }, [hoveredLocation, activeLocationId, locations]);

  // Setup D3 Projection
  const projection = useMemo(() => {
    return geoAzimuthalEqualArea()
      .rotate([-15, 0, 0]) // Center perfectly on Africa
      .scale(350)
      .translate([400, 300]); // Translate to center of viewBox
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // Get a set of country names that we have active locations for
  const activeCountryNames = useMemo(() => {
    return new Set(locations.map(loc => loc.id || loc.label));
  }, [locations]);

  return (
    <div className="w-full h-full relative font-sans overflow-hidden bg-transparent rounded-[inherit]">
      
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {geographies.map((geo, i) => {
            // The TopoJSON library abbreviates some names, map them to our full names
            const rawName = geo.properties?.name;
            const countryName = rawName === "S. Sudan" ? "South Sudan" : rawName;
            
            const isTargetCountry = activeCountryNames.has(countryName);
            const isActive = countryName === activeLocationId;
            const isHovered = countryName === hoveredLocation;
            const isHighlighted = isActive || isHovered;

            // Determine fill color
            let fill = "#cbd5e1"; // Base slate-300 for visible light map
            if (isHighlighted && isTargetCountry) {
              fill = lineColor; // Highlighted color
            } else if (isTargetCountry) {
              fill = "#94a3b8"; // Slightly darker to show it's a partner country even when not hovered
            }

            return (
              <path
                key={`geo-${i}`}
                d={pathGenerator(geo) || ""}
                fill={fill}
                stroke="#ffffff" // White borders for clean separation
                strokeWidth={1}
                className={`outline-none transition-all duration-300 ${isTargetCountry ? 'cursor-pointer' : ''}`}
                onMouseEnter={() => {
                  if (isTargetCountry) setHoveredLocation(countryName);
                }}
                onMouseLeave={() => {
                  if (isTargetCountry) setHoveredLocation(null);
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {activeLabel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-night text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-2xl pointer-events-none z-10"
          >
            {activeLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
