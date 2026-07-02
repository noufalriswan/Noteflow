import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdUpdate, MdCancel } from "react-icons/md";

function MainBody() {
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState("");
    const [newTask, setNewTask] = useState("");


    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        axios
            .get("http://localhost:5000/api/tasks")
            .then((res) => setTasks(res.data))
            .catch((err) => console.log(err));
    };

    const handleEdit = (task) => {
        setEditId(task._id);
        setUpdatedTask(task.task);
    };



    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${editId}`,
                {
                    task: updatedTask,
                }
            );

            setEditId(null);
            setUpdatedTask("");
            getTasks();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            getTasks();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="task-container container">
            {tasks.map((task) => (
                <div className="task-card" key={task._id}>

                    <div className="task-content">
                        <h3>Task</h3>
                        <p className="task-text"><b>{task.task}</b></p>
                        <p><b>Date : </b>{new Date(task.date).toLocaleDateString()}</p>
                    </div>

                    {editId !== task._id ? (
                        <div className="task-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(task)}
                            >
                                <FaEdit />
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(task._id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ) : (
                        <div className="update-box">
                            <input
                                type="text"
                                value={updatedTask}
                                onChange={(e) => setUpdatedTask(e.target.value)}
                                placeholder="Enter updated task"
                            />

                            <button onClick={handleUpdate}>
                                <i class="bi bi-check-circle"></i>
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setEditId(null);
                                    setUpdatedTask("");
                                }}
                            >
                                <i class="bi bi-x-circle"></i>
                            </button>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}

export default MainBody;