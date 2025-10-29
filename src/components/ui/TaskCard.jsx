"use client" 
import { TaskApi } from '@/context/TaskContext'
import { handleFailure, handleSuccess } from '@/lib/notification'
import axios from 'axios'
import { CalendarClockIcon, CheckCircle, Clock, Edit, Hammer, Trash } from 'lucide-react'
import React, { useContext } from 'react'

const TaskCard = ({taskInfo, setShowPopUp }) => {

    const {setTaskList, setTask, setEditId} = useContext(TaskApi);

    const statusIcons = {
        "pending" : <Hammer size={18} className='text-orange-600'/>,
        "in-progress" : <Clock size={18} className='text-yellow-600' />,
        "completed" : <CheckCircle size={18} className='text-green-600' />
    }

    const cardsBackground = (status) => {
        switch (status) {
            case "pending":
                return "bg-orange-50 border-orange-500"
            case "in-progress":
                return "bg-yellow-100 border-yellow-500"
            case "completed":
                return "bg-green-100 border-green-500"    
            default:
                return "bg-gray-50 border-gray-300";
        }
    }

    const indicatorColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-orange-500"
            case "in-progress":
                return "bg-yellow-500"
            case "completed":
                return "bg-green-500 "    
            default:
                return "bg-gray-500";
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            const res = await axios.delete(`/api/tasks/${taskId}`);
            const {success, message} = res.data;
            if(success) {
                setTaskList(prev => prev.filter(t => (t._id || t.id || t.tempId) !== taskId));
                handleSuccess(message);
            }
        } catch (error) {
            if(error.response) {
                const data = error.response.data;
                handleFailure(data.error || "Invalid credentials");
            }
            else {
                console.log('Error in issue delete', error.message);
                handleFailure("Network error something went wrong" || error.message);
            }
        }
    };

  return (
    <div className={`max-w-[400px] w-full h-full relative py-7 px-5 rounded-2xl 
    flex flex-col justify-between gap-2 shadow-lg
    border-4 text-black ${cardsBackground(taskInfo.status)} `}>
        <h1 className='text-center text-2xl font-semibold capitalize'>{taskInfo.title}</h1>
        <p className='text-sm text-gray-700'>
        {taskInfo.description}</p>  
        <p className='flex gap-2 items-center'><strong>Status: </strong>{statusIcons[taskInfo.status]} {taskInfo.status}</p>
        <div className='flex gap-2 items-center'>
            <CalendarClockIcon size={20}/>
            <p className=''><strong>Due: </strong>{taskInfo.dueDate}</p>
        </div>
        <div className='absolute bottom-2 right-3 sm:bottom-4 sm:right-4 flex items-center gap-3 sm:gap-4 mt-3'>
            <Edit onClick={() => {
                setTask({
                    title: taskInfo.title,
                    description: taskInfo.description,
                    dueDate: taskInfo.dueDate,
                    status: taskInfo.status
                });
                setShowPopUp(true);
                setEditId(taskInfo._id);
            }}
            size={20} strokeWidth={2.3} className='hover:text-gray-600 cursor-pointer' />
            <Trash onClick={() => handleDeleteTask(taskInfo._id)}
            size={20} strokeWidth={2.3} className='hover:text-gray-600 cursor-pointer'/>
        </div>
        <div className={`w-6 h-6 rounded-full absolute -top-3 -right-2 ${indicatorColor(taskInfo.status)} border-2 border-white`}></div>
    </div>
  )
}

export default TaskCard