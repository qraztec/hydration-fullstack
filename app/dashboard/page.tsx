'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StationMonitor from '../components/StationMonitor';
import { useStationContext } from '../../context/StationContext';

function Dashboard() {
  const { stations, selectedStation, setSelectedStation } = useStationContext();

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  }

  if (!selectedStation) {
    return <div>Loading stations...</div>; // Show loading until a station is selected
  }

  return (
    <div>
      <Navbar onSelectStation={handleStationSelect} selectedStation={selectedStation} />
      <StationMonitor station={selectedStation} />
    </div>
  );
}

export default Dashboard;
