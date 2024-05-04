import { useState, useRef } from "react";
import '../App.css';

// function StickyNote({ onClose, type }) {
//     const [allowMove, setAllowMove] = useState(false);
//     const [tasks, setTasks] = useState([]); // State to track tasks
//     const [newTask, setNewTask] = useState(""); // State to track new task input
//     const stickyNoteRef = useRef();

//     const [dx, setDx] = useState(0)
//     const [dy, setDy] = useState(0)

//     function handleMouseDown(e) {
//         setAllowMove(true)
//         const dimensions = stickyNoteRef.current.getBoundingClientRect()
//         setDx(e.clientX - dimensions.x)
//         setDy(e.clientY - dimensions.y)
//     }
//     function handleMouseMove(e) {
//         if (allowMove) {
//             // move the sticky note
//             console.log("allow moving - ", e.clientX, dx, e.clientY, dy)
//             const x = e.clientX - dx
//             const y = e.clientY - dy
//             console.log("inside mouse move", x, y)
//             stickyNoteRef.current.style.left = x + "px"
//             stickyNoteRef.current.style.top = y + "px"
//         }
//     }
//     function handleMouseUp() {
//         setAllowMove(false)
//     }

//     // handle task related behaviour
//     function handleNewTaskChange(e) {
//         setNewTask(e.target.value);
//     }

//     function addTask() {
//         if (newTask.trim()) {
//             setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
//             setNewTask("");
//         }
//     }

//     function toggleTaskCompletion(taskId) {
//         setTasks(tasks.map((task) => 
//             task.id === taskId ? { ...task, completed: !task.completed } : task
//         ));
//     }

//     function removeTask(taskId) {
//         setTasks(tasks.filter((task) => task.id !== taskId));
//     }

//     return (
//         <div className="sticky-note" ref={stickyNoteRef}>
//             <div
//                 className="sticky-note-header"
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//             >
//                 <input className="sticky-note-title" placeholder="Enter Note Title" />
//                 <div className="close" onClick={onClose}>
//                     &times;
//                 </div>
//             </div>
//             {type === "task" && (
//                 <div className="sticky-note-body checklist">
//                     {/* Input field to add new tasks */}
//                     <div>
//                         <input
//                             type="text"
//                             value={newTask}
//                             onChange={handleNewTaskChange}
//                             placeholder="Add a new task..."
//                         />
//                         <button onClick={addTask}>Add</button>
//                     </div>

//                     {/* Render the list of tasks */}
//                     <ul>
//                         {tasks.map((task) => (
//                             <li key={task.id}>
//                                 <input
//                                     type="checkbox"
//                                     checked={task.completed}
//                                     onChange={() => toggleTaskCompletion(task.id)}
//                                 />
//                                 <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
//                                     {task.text}
//                                 </span>
//                                 <button onClick={() => removeTask(task.id)}>Remove</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             {type === "freeText" && (
//                 <textarea placeholder="Enter text here" className="sticky-note-body"></textarea>
//             )}
//         </div>
//     )
// }

// export default StickyNote;
function StickyNote({ onClose, type }) {
    const [allowMove, setAllowMove] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const stickyNoteRef = useRef();

    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

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

    // Handle task related behavior
    function handleNewTaskChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim()) {
            const task = { id: Date.now(), text: newTask, completed: false };
            setTasks((prevTasks) => [...prevTasks, task]);
            setNewTask("");
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
                    <div>
                        <input
                            type="text"
                            value={newTask}
                            onChange={handleNewTaskChange}
                            placeholder="Add a new task..."
                        />
                        <button onClick={addTask}>Add</button>
                    </div>

                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.text}
                                </span>
                                <button onClick={() => removeTask(task.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {type === "freeText" && (
                <textarea placeholder="Enter text here" className="sticky-note-body"></textarea>
            )}
        </div>
    );
}

export default StickyNote;
