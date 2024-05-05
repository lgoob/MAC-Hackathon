import React, { useState, useEffect } from "react";
import "./tailwind.css";
import Sample from "../pictures/sample_image.jpeg";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import WidgetSelector from "./WidgetSelector";

const widgetOptions = [
  { id: 1, image: Sample, colSpan: 1 },
  { id: 2, image: Sample, colSpan: 1 },
  { id: 3, image: Sample, colSpan: 2 },
  { id: 4, image: Sample, colSpan: 2 },
];

const Corkboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("widgets");
    if (savedWidgets) {
      return JSON.parse(savedWidgets);
    } else {
      return [{ colSpan: 1 }, { colSpan: 2 }];
    }
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
    if (!newWidgets.some((widget) => widget?.image)) {
      newWidgets.length = 4;
      newWidgets[0] = { colSpan: 1 };
      newWidgets[1] = { colSpan: 1 };
      newWidgets[2] = { colSpan: 2 };
      newWidgets[3] = { colSpan: 2 };
    }
    setWidgets(newWidgets);
  };

  const NewWidgetButton = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full col-span-1">
        <HiOutlinePlusCircle className="text-yellow-900 h-10 w-10" />
        <p className="text-yellow-900">New widget</p>
      </div>
    );
  };

  return (
    <div className="bg-yellow-900 p-4 w-96 h-screen m-5 rounded-xl">
      <h1 className="text-3xl font-bold font-serif text-white opacity-50 text-center">
        Pins
      </h1>

      <div className="grid grid-cols-2 grid-rows-4 h-full gap-x-4">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className={`bg-yellow-50 rounded-xl shadow-lg cursor-pointer relative self-center row-span-1 ${
              widget?.colSpan == 2
                ? "col-span-2 aspect-video"
                : "col-span-1 aspect-square"
            } ${
              widget && widget.image
                ? "opacity-100"
                : "opacity-50 hover:opacity-75 transition-all"
            }`}
            onClick={() => openWidgetSelector(index)}
          >
            {widget && widget.image ? (
              <div className="absolute inset-0">
                <img
                  src={widget.image}
                  alt={`Widget ${index}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <IoClose
                  className="absolute top-2 size-8 right-2 text-red-700 bg-white border-2 border-yellow-900 rounded-full transition-all p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWidget(index);
                  }}
                />
              </div>
            ) : (
              <NewWidgetButton />
            )}
          </div>
        ))}
      </div>
      {showSelector && (
        <WidgetSelector
          widgetOptions={widgetOptions}
          addWidget={addWidget}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
};

export default Corkboard;
