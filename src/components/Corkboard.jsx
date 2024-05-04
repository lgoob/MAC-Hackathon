import React, { useState, useEffect } from "react";
import "./tailwind.css";
import Sample from "../pictures/sample_image.jpeg";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const widgetOptions = [
  { id: 1, image: Sample },
  { id: 2, image: Sample },
  { id: 3, image: Sample },
];

const Corkboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("widgets");
    return savedWidgets ? JSON.parse(savedWidgets) : Array(3).fill(null);
  });
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
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
    <div className="bg-yellow-900 p-4 w-96 h-screen">
      <div className="grid grid-cols-2 grid-rows-4 h-full gap-x-4">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className={`bg-yellow-50 rounded-xl shadow-lg cursor-pointer relative ${
              index === 2
                ? "col-span-2 aspect-video"
                : "col-span-1 row-span-1 aspect-square"
            } ${
              widget
                ? "opacity-100"
                : "opacity-50 hover:opacity-75 transition-all"
            }`}
            onClick={() => openWidgetSelector(index)}
          >
            {widget ? (
              <div className="absolute inset-0">
                <img
                  src={widget.image}
                  alt={`Widget ${index}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <IoClose
                  className="absolute top-2 size-8 right-2 text-red-700 bg-white border-2 border-yellow-900 rounded-full transition-all p-1 rounded-2xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWidget(index);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <HiOutlinePlusCircle className="text-yellow-900 h-10 w-10" />
                <p className="text-yellow-900">New widget</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {showSelector && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
            <h4 className="text-lg font-bold mb-4">Select a Widget</h4>
            <div className="grid grid-cols-3 gap-4">
              {widgetOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-white rounded-lg shadow-lg border-t-1 p-4 w-48"
                  onClick={() => addWidget(option)}
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
              className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={() => setShowSelector(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Corkboard;
