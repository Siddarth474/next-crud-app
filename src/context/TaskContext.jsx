"use client"
import { createContext, useState } from "react";

export const TaskApi = createContext();

const TaskApiProvider = (props) => {
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
    });

    const [editId, setEditId] = useState('');

    const contextValue = {
        taskList, setTaskList,
        task, setTask,
        editId, setEditId
    }

    return (
        <TaskApi.Provider value={contextValue}>
            {props.children}
        </TaskApi.Provider>
    )
}

export default TaskApiProvider;