import React, { useState, useRef, useEffect } from "react";
import "../stickyNote.css";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

function StickyNote({ onClose, type, id }) {
  const stickyNoteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`stickyNote_${id}_position`));
    if (savedPosition) {
      stickyNoteRef.current.style.left = `${savedPosition.x}px`;
      stickyNoteRef.current.style.top = `${savedPosition.y}px`;
    }
  }, [id]);

  const handleMouseDown = (event) => {
    const elementRect = stickyNoteRef.current.getBoundingClientRect();
    setOffset({
      x: event.clientX - elementRect.left,
      y: event.clientY - elementRect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const x = event.clientX - offset.x;
      const y = event.clientY - offset.y;
      stickyNoteRef.current.style.left = `${x}px`;
      stickyNoteRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const position = {
      x: parseInt(stickyNoteRef.current.style.left, 10),
      y: parseInt(stickyNoteRef.current.style.top, 10),
    };
    localStorage.setItem(`stickyNote_${id}_position`, JSON.stringify(position));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const [title, setTitle] = useState(() => {
    return localStorage.getItem(`stickyNote_${id}_title`) || "";
  });
  const [text, setText] = useState(() => {
    return localStorage.getItem(`stickyNote_${id}_text`) || "";
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`stickyNote_${id}_tasks`);
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: false },
      { id: 3, text: "Task 3", completed: false },
      { id: 4, text: "Task 4", completed: false },
      { id: 5, text: "Task 5", completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`stickyNote_${id}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progress = (tasks.length === 0) ? 0 : (completedTasksCount / tasks.length) * 100;

  function handleTitleChange(e) {
      const newTitle = e.target.value;
      if (newTitle.length > 25) {
          alert("Title cannot exceed 25 characters. Please enter a shorter title.");
      } else {
          setTitle(newTitle);
          localStorage.setItem(`stickyNote_${id}_title`, newTitle);
      }
  }

  function handleTextChange(e) {
    const newText = e.target.value;
    if (newText.length > 200) {
      alert("Text cannot exceed 200 characters. Please reduce your text.");
    }
    else {
      setText(newText);
      localStorage.setItem(`stickyNote_${id}_text`, newText);
    }
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

  function addTask() {
    const newTaskId = Date.now();
    const newTask = {
        id: newTaskId,
        text: "",
        completed: false,
    };
    setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem(`stickyNote_${id}_tasks`, JSON.stringify(updatedTasks));
        return updatedTasks;
    });
    setEditingTaskId(newTaskId);
  }

  function startEditingTask(taskId) {
    setEditingTaskId(taskId);
  }

  function handleInputChange(e) {
    const newValue = e.target.value;
    if (newValue.length > 25) {
      alert("Task length cannot exceed 25 characters. Please enter a shorter task.");
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: newValue } : task
        )
      );
    }
  }

  function finishEditingTask() {
    setEditingTaskId(null);
  }

  return (
    <div className="absolute size-140 bg-yellow-100 rounded-xl shadow-xl w-96" ref={stickyNoteRef} onMouseDown={handleMouseDown} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
      <div className="flex items-center justify-between p-2 bg-yellow-200 rounded-t-lg">
        <input
          className="text-xl font-semibold bg-transparent focus:outline-none"
          placeholder="Enter title..."
          value={title}
          onChange={handleTitleChange}
          onBlur={() => localStorage.setItem(`stickyNote_${id}_title`, title)}
        />
        <div class="text-lg font-bold cursor-pointer" onClick={onClose}>
          <IoClose />
        </div>
      </div>
      {type === "task" && (
        <div className="p-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center my-3 hover:bg-yellow-200 transition-all py-2 px-4 rounded-xl"
            >
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
                    style={{cursor:'text'}}
                    autoFocus
                  />
                ) : (
                  <span
                    style={{ textDecoration: task.completed ? "line-through" : "none", cursor:'text'}}
                    onClick={() => startEditingTask(task.id)}
                    className="flex-1 ml-2 text-lg cursor-pointer"
                  >
                  {task.text || 'Edit Task'}

                  </span>
                )}
              
              <button
                className="text-red-400 hover:text-red-500 transition-all focus:outline-none ml-2"
                onClick={() => removeTask(task.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
          {tasks.length < 5 && (
            <div>
              <button type="button" onClick={addTask} class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Add Task</button>
            </div>
          )}
          <div className="relative bg-gray-200 rounded-full h-8 mb-2">
            <div
              className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      )}
      {type === "freeText" && (
       <textarea
          placeholder="Enter text here"
          className="p-6 h-full text-lg w-full resize-none outline-none bg-transparent leading-10 tracking-wider"
          value={text}
          onChange={handleTextChange}
        ></textarea>
      )}
    </div>
  );
}

export default StickyNote;
