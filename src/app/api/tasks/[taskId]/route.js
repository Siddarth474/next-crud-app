import { connectDB } from "@/lib/dbConfig";
import { Task } from "@/models/taskModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const userId = await getDataFromToken(request);
        const { taskId } = await params;

        const task = await Task.findOne({ _id: taskId, owner: userId });

        if (!task) {
            return NextResponse.json(
                { error: "Task not found or unauthorized", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, task }, {status: 200});

    } catch (error) {
        console.error("Error fetching task:", error);
            return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
};

export const PATCH = async (request, { params }) => {
    try {
        await connectDB();
        const userId = await getDataFromToken(request);
        const { taskId } = await params;
        const { title, description, status, dueDate } = await request.json();

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, owner: userId },
            { title, description, status, dueDate },
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json(
                { error: "Task not found or unauthorized", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Task updated successfully",
            success: true,
            updatedTask,
        }, {status: 200});

    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const userId = await getDataFromToken(request);
    const { taskId } = await params;
    
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      owner: userId,
    });

    if (!deletedTask) {
      return NextResponse.json(
        { error: "Task not found or unauthorized", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
    
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};
