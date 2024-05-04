import { useState, useRef } from "react";
import '../stickyNote.css';

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
        <div className="sticky-note" ref={stickyNoteRef}>
            <div
                className="sticky-note-header"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <input className="sticky-note-title" placeholder="Enter Note Title" />
                <div className="close" onClick={onClose}>
                    &times;
                </div>
            </div>
            {type === "task" && (
                <div className="sticky-note-body checklist">
                    {/* Render tasks as individual div elements */}
                    {tasks.map((task) => (
                        <div key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={task.text}
                                    onChange={handleInputChange}
                                    onBlur={finishEditingTask}
                                />
                            ) : (
                                <span
                                    style={{ textDecoration: task.completed ? "line-through" : "none" }}
                                    onClick={() => startEditingTask(task.id)}
                                >
                                    {task.text}
                                </span>
                            )}
                            <button className="removing-a-task" onClick={() => removeTask(task.id)}>x</button>
                        </div>
                    ))}
                </div>
            )}
            {type === "freeText" && (
                <textarea placeholder="Enter text here" className="sticky-note-body"></textarea>
            )}
        </div>
    );
}

export default StickyNote;
