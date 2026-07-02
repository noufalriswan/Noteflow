import React from 'react'
import { FaPlus } from "react-icons/fa";
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { MdMenuBook } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Components.css'
import logo from "../assets/logo.png";
import axios from "axios";

function Header() {

    const [showAdd, setShowAdd] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [date, setDate] = useState("");
    const [refresh, setRefresh] = useState(false);

    const getTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTasks();
    }, [refresh]);

    const handleAdd = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    task: newTask,
                    date: date,
                }


            );

            console.log(res.data);
            window.location.reload();

            setNewTask("");
            setShowAdd(false);

            getTasks(); // Refresh tasks
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <nav className="fixed-header">
                <div className="navbar container">
                    <div className="logo d-flex">
                        <img src={logo} alt="Logo" className="logo-img" />
                        <h1>NoteFlow</h1>
                    </div>

                    <button
                        className="new-note-btn"
                        onClick={() => {
                            console.log("Button clicked");
                            setShowAdd(true);
                        }}
                    >
                        + New Note
                    </button>
                </div>
            </nav>
            {showAdd && (
                <div className="modal-overlay">
                    <div className="add-note-modal">
                        <h2>New Note</h2>

                        <input
                            type="text"
                            placeholder="Enter your task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <div className="modal-buttons">
                            <button className="save-btn" onClick={handleAdd}>
                                Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowAdd(false);
                                    setNewTask("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
