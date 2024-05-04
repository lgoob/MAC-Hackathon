import React, { useState } from 'react';
import "./tailwind.css";
import Sample from "./sample.png"
// Placeholder images for widget choices
const widgetOptions = [
  { id: 1, image: Sample },
  { id: 2, image: Sample },
  { id: 3, image: Sample }
];

const Corkboard = () => {
  const [widgets, setWidgets] = useState(Array(3).fill(null));
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [previewWidget, setPreviewWidget] = useState(null);

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

  return (
    <div className="corkboard-container">
      {widgets.map((widget, index) => (
        <div key={index} className={`slot ${index === 2 ? 'full-width' : ''}`} onClick={() => openWidgetSelector(index)}>
          {widget && <img src={widget.image} alt={`Widget ${index}`} style={{ width: '100%', height: '100%' }} />}
        </div>
      ))}

      {showSelector && (
        <div className="widget-selector">
          <h4>Select a Widget:</h4>
          {widgetOptions.map(option => (
            <div key={option.id} onMouseEnter={() => setPreviewWidget(option)}
                 onClick={() => addWidget(option)}>
              <img src={option.image} alt={`Select ${option.id}`} />
            </div>
          ))}
          <button onClick={() => setShowSelector(false)}>Close</button>
          {previewWidget && (
            <div className="preview">
              <img src={previewWidget.image} alt="Preview" style={{ width: '100px', height: 'auto' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Corkboard;
