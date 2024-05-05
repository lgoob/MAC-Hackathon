import React, { useRef } from "react";
import { IoIosClose } from "react-icons/io";

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
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-md w-2/3 relative"
      >
        <h4 className="text-lg font-bold mb-4">Select a Widget</h4>
        <button
          className="absolute top-2 right-2"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          <IoIosClose className="size-9" />
        </button>
        <div className="grid grid-cols-4 gap-5 mb-1">
          {widgetOptions.map((option) => (
            <div
              key={option.id}
              className={`bg-white rounded-lg border-l shadow-md h-48 border-t-1 col-span-${option.colSpan} hover:scale-105 transition-transform duration-200`}
              onClick={(event) => {
                event.stopPropagation();
                addWidget(option);
              }}
            >
              <img
                src={option.image}
                alt={`Select ${option.id}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetSelector;
