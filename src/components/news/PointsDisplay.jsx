// src/components/news/PointsDisplay.jsx
import React from 'react';
import { useNews } from '../../context/NewsContext';

const PointsDisplay = () => {
  const { userPoints, addPoints, resetPoints } = useNews();

  const handleAddPoints = () => {
    addPoints(10);
  };

  return (
    <div className="points-display">
      <div className="points-container">
        <h3>Your Points</h3>
        <div className="points-value">
          <span className="points-number">{userPoints}</span>
          <span className="points-label">Points</span>
        </div>
      </div>
      
      <div className="points-actions">
        <button 
          onClick={handleAddPoints}
          className="btn-add-points"
        >
          Add 10 Points
        </button>
        <button 
          onClick={resetPoints}
          className="btn-reset-points"
        >
          Reset Points
        </button>
      </div>

      <style jsx>{`
        .points-display {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 20px;
          color: white;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
        }

        .points-container h3 {
          margin: 0 0 15px 0;
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .points-value {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .points-number {
          font-size: 2.5rem;
          font-weight: bold;
          line-height: 1;
        }

        .points-label {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .points-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .points-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-add-points {
          background: #4CAF50;
          color: white;
        }

        .btn-add-points:hover {
          background: #45a049;
          transform: translateY(-2px);
        }

        .btn-reset-points {
          background: #f44336;
          color: white;
        }

        .btn-reset-points:hover {
          background: #da190b;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .points-display {
            margin: 15px;
            padding: 15px;
          }

          .points-number {
            font-size: 2rem;
          }

          .points-actions {
            flex-direction: column;
            align-items: center;
          }

          .points-actions button {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default PointsDisplay;
