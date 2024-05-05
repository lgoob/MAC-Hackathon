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

  // Add event listeners
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

  // Handling title and text
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
      { id: 3, text: "Task 3", completed: false },
      { id: 4, text: "Task 4", completed: false },
      { id: 5, text: "Task 5", completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`stickyNote_${id}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  

  




  function handleTitleChange(e) {
      const newTitle = e.target.value;
      if (newTitle.length > 25) {
          // If the new title exceeds 25 characters, notify the user
          alert("Title cannot exceed 25 characters. Please enter a shorter title.");
      } else {
          // Otherwise, set the new title and update local storage
          setTitle(newTitle);
          localStorage.setItem(`stickyNote_${id}_title`, newTitle);
      }
  }


  function handleTextChange(e) {
    const newText = e.target.value;
    if (newText.length > 200) {
      // If the new text exceeds 200 characters, notify the user
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
    // Generate a unique ID for the new task
    const newTaskId = Date.now();

    // Create a new task object with the new task ID, empty text, and completed status as false
    const newTask = {
        id: newTaskId,
        text: "",
        completed: false,
    };

    // Add the new task to the tasks state
    setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        // Update local storage with the new tasks array
        localStorage.setItem(`stickyNote_${id}_tasks`, JSON.stringify(updatedTasks));
        return updatedTasks;
    });

    // Set the new task as the one being edited
    setEditingTaskId(newTaskId);
}


  function startEditingTask(taskId) {
    setEditingTaskId(taskId);
  }

  function handleInputChange(e) {
    const newValue = e.target.value;
    if (newValue.length > 25) {
      // If the new task exceeds 25 characters, notify the user
      alert("Task length cannot exceed 25 characters. Please enter a shorter task.");
    }
    else {
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
      <div className="flex items-center justify-between p-2 bg-yellow-200 rounded-t-lg cursor-move">
        <input
          className="text-xl font-semibold bg-transparent focus:outline-none"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => localStorage.setItem(`stickyNote_${id}_title`, title)}
        />
        <div className="text-lg font-bold cursor-pointer" onClick={onClose}>
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

          {tasks.length < 5 && (
            <div>
              <button type="button" onClick={addTask} class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Add Task</button>
            </div>
          )}

        </div>
      )}
      {type === "freeText" && (
       <textarea
          placeholder="Enter text here"
          className="p-2 h-full text-sm w-full resize-none outline-none bg-transparent leading-10 tracking-wider"
          value={text}
          onChange={handleTextChange}
        ></textarea>
      )}
    </div>
  );
}

export default StickyNote;