import React, { useState, useRef, useEffect } from "react";
import "../stickyNote.css";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

function StickyNote({ onClose, type, id }) {
  const stickyNoteRef = useRef(null);

  // Initialize states for position handling
  const [allowMove, setAllowMove] = useState(false);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`stickyNote_${id}_position`));
    if (savedPosition && stickyNoteRef.current) {
      stickyNoteRef.current.style.left = savedPosition.left;
      stickyNoteRef.current.style.top = savedPosition.top;
    }
  }, [id]);

  const [title, setTitle] = useState(() => {
    return localStorage.getItem(`stickyNote_${id}_title`) || "";
  });

  const [text, setText] = useState(() => {
    return localStorage.getItem(`stickyNote_${id}_text`) || "";
  });

  // Initialize tasks with an array of default tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`stickyNote_${id}_tasks`);
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: false },
      { id: 3, text: "Task 3", completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`stickyNote_${id}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  function handleMouseDown(e) {
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
    setAllowMove(true);
  }

  function handleMouseMove(e) {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = `${x}px`;
      stickyNoteRef.current.style.top = `${y}px`;
    }
  }

  function handleMouseUp() {
    setAllowMove(false);
    const position = {
      left: stickyNoteRef.current.style.left,
      top: stickyNoteRef.current.style.top
    };
    localStorage.setItem(`stickyNote_${id}_position`, JSON.stringify(position));
  }

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem(`stickyNote_${id}_title`, newTitle);
  }

  function handleTextChange(e) {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem(`stickyNote_${id}_text`, newText);
  }

  function toggleTaskCompletion(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function startEditingTask(taskId) {
    setEditingTaskId(taskId);
  }

  function handleInputChange(e) {
    const newValue = e.target.value;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: newValue } : task
      )
    );
  }

  function finishEditingTask() {
    setEditingTaskId(null);
  }

  return (
    <div className="fixed size-80 bg-yellow-100 rounded-xl shadow-xl" ref={stickyNoteRef}>
      <div className="flex items-center justify-between p-2 bg-yellow-200 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <input
          className="text-xl font-semibold bg-transparent focus:outline-none"
          placeholder="Enter title..."
          value={title}
          onChange={handleTitleChange}
        />
        <div className="text-lg font-bold cursor-pointer" onClick={onClose}>
          <IoClose className="size-6" />
        </div>
      </div>
      {type === "task" && (
        <div className="p-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center my-3 hover:bg-yellow-200 transition-all py-2 px-4 rounded-xl"
            >
              <label className="inline-flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={task.text}
                    onChange={handleInputChange}
                    onBlur={finishEditingTask}
                    className="flex-1 ml-2 text-lg bg-transparent focus:outline-none"
                  />
                ) : (
                  <span
                    style={{ textDecoration: task.completed ? "line-through" : "none" }}
                    onClick={() => startEditingTask(task.id)}
                    className="flex-1 ml-2 text-lg cursor-pointer"
                  >
                    {task.text}
                  </span>
                )}
              </label>
              <button
                className="text-red-400 hover:text-red-500 transition-all focus:outline-none ml-2"
                onClick={() => removeTask(task.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
      {type === "freeText" && (
        <textarea
          placeholder="Enter text here"
          className="p-2 h-40 text-sm resize-none outline-none bg-transparent"
          value={text}
          onChange={handleTextChange}
        ></textarea>
      )}
    </div>
  );
}

export default StickyNote;
