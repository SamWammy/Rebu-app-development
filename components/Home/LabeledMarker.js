import React from 'react';
import { OverlayView } from '@react-google-maps/api';

const LabeledMarker = ({ position, label }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height + 40), 
      })}
    >
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Marker Icon */}
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#4285F4', 
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            top: '30px', 
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
    </OverlayView>
  );
};

export default LabeledMarker;