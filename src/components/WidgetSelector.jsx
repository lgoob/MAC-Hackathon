// src/components/WidgetSelector.jsx
import React, { useRef } from "react";

const WidgetSelector = ({ widgetOptions, addWidget, onClose }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <h4 className="text-lg font-bold mb-4">Select a Widget</h4>
        <div className="grid grid-cols-3 gap-4">
          {widgetOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-lg shadow-lg border-t-1 p-4 w-48 hover:scale-105 transition-transform duration-200"
              onClick={(event) => {
                event.stopPropagation();
                addWidget(option);
              }}
            >
              <img
                src={option.image}
                alt={`Select ${option.id}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-white shadow-md border-t border-l text-red-600 px-4 py-2 rounded"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WidgetSelector;
