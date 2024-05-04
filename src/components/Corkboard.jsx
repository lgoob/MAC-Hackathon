import React, { useState, useEffect } from 'react';
import "./tailwind.css";
import Sample from "../pictures/sample_image.jpeg";

const widgetOptions = [
  { id: 1, image: Sample },
  { id: 2, image: Sample },
  { id: 3, image: Sample }
];

const Corkboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem('widgets');
    return savedWidgets ? JSON.parse(savedWidgets) : Array(3).fill(null);
  });

  const [showSelector, setShowSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    localStorage.setItem('widgets', JSON.stringify(widgets));
  }, [widgets]);

  const openWidgetSelector = (index) => {
    setSelectedSlot(index);
    setShowSelector(true);
  };

  const addWidget = (widget) => {
    const newWidgets = [...widgets];
    newWidgets[selectedSlot] = widget;
    setWidgets(newWidgets);
    setShowSelector(false);
  };

  const deleteWidget = (index) => {
    const newWidgets = [...widgets];
    newWidgets[index] = null;
    setWidgets(newWidgets);
  };

  return (
    <div className="corkboard-container">
      {widgets.map((widget, index) => (
        <div key={index} className={`slot ${index === 2 ? 'full-width' : ''}`} onClick={() => openWidgetSelector(index)}>
          {widget ? (
            <div>
              <img src={widget.image} alt={`Widget ${index}`} style={{ width: '100%', height: '100%' }} />
              <button onClick={(e) => { e.stopPropagation(); deleteWidget(index); }}>Delete</button>
            </div>
          ) : (
            <p>Click to add widget</p>
          )}
        </div>
      ))}

      {showSelector && (
        <div className="widget-selector">
          <h4>Select a Widget:</h4>
          {widgetOptions.map(option => (
            <div key={option.id} onClick={() => addWidget(option)}>
              <img src={option.image} alt={`Select ${option.id}`} />
            </div>
          ))}
          <button onClick={() => setShowSelector(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Corkboard;
