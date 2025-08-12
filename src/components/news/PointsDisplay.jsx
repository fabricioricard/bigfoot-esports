// src/components/news/PointsDisplay.jsx
import React from 'react';
import { useNews } from '../../context/NewsContext';

const PointsDisplay = () => {
  const { userPoints, user } = useNews();

  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full px-4 py-2 shadow-lg border border-yellow-500/30">
      <div className="flex items-center gap-2 text-white">
        <div className="bg-white/20 rounded-full p-1">
          <span className="text-sm">🪙</span>
        </div>
        <div className="font-bold">
          {userPoints.toLocaleString('pt-BR')}
        </div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-90">
          BIGFOOT
        </div>
      </div>
    </div>
  );
};

export default PointsDisplay;
