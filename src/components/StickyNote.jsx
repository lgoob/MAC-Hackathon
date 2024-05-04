import { useState, useRef } from "react";
import "../stickyNote.css";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

function StickyNote({ onClose, type }) {
  // Get a reference to a sticky note
  const stickyNoteRef = useRef();
  // Create states for moving a sticky note and its current coordinates
  const [allowMove, setAllowMove] = useState(false);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  // Initialize tasks with an array of default tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
    { id: 3, text: "Task 3", completed: false },
  ]);

  // State for the task currently being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Function to handle mouse down event
  function handleMouseDown(e) {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  }

  // Function to handle mouse move event
  function handleMouseMove(e) {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  }

  // Function to handle mouse up event
  function handleMouseUp() {
    setAllowMove(false);
  }

  // Function to toggle task completion
  function toggleTaskCompletion(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Function to remove a task
  function removeTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  // Function to handle starting task editing
  function startEditingTask(taskId) {
    setEditingTaskId(taskId);
  }

  // Function to handle input change during task editing
  function handleInputChange(e) {
    const newValue = e.target.value;
    // Update the text of the task being edited
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: newValue } : task
      )
    );
  }

  // Function to handle finishing task editing
  function finishEditingTask() {
    setEditingTaskId(null);
  }

  return (
    <div
      className="fixed size-80 bg-yellow-100 rounded-xl shadow-xl"
      ref={stickyNoteRef}
    >
      <div
        className="flex items-center justify-between p-2 bg-yellow-200 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <input
          className="text-xl font-semibold bg-transparent focus:outline-none"
          placeholder="Enter title..."
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
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={task.text}
                      onChange={handleInputChange}
                      onBlur={finishEditingTask}
                      className="flex-1 text-lg bg-transparent focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => startEditingTask(task.id)}
                      className="flex-1 text-lg cursor-pointer"
                    >
                      {task.text}
                    </span>
                  )}
                </span>
              </label>
              <button
                className="text-red-400 hover:text-red-500 transition-all focus:outline-none ml-auto"
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
        ></textarea>
      )}
    </div>
  );
}

export default StickyNote;
