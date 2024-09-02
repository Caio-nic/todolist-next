import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../types";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskTitle: string) => {
    if (taskTitle.length < 5 || taskTitle.length > 30) {
      setErrorMessage("A tarefa deve ter entre 5 e 30 caracteres.");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      status: "Todo",
    };

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    });

    if (response.ok) {
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setErrorMessage(null);
    } else {
      setErrorMessage("Erro ao adicionar a tarefa.");
    }
  };

  const startTask = async (taskId: number) => {
    await updateTaskStatus(taskId, "Working");
  };

  const completeTask = async (taskId: number) => {
    await updateTaskStatus(taskId, "Done");
  };

  const updateTaskStatus = async (
    taskId: number,
    status: "Working" | "Done"
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, status };

      const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
        );
      }
    }
  };

  const deleteTask = async (taskId: number) => {
    const response = await fetch(`http://localhost:3000/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    });

    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      alert("Erro ao deletar a tarefa.");
    }
  };

  const deleteSelectedTasks = async (taskIds: number[]) => {
    const response = await fetch(`http://localhost:3000/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: taskIds }),
    });

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => !taskIds.includes(task.id))
      );
    } else {
      alert("Erro ao deletar tarefas selecionadas.");
    }
  };

  const editTask = async (taskId: number, newTitle: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, title: newTitle };

      const response = await fetch(`http://localhost:3000/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
        );
      }
    }
  };

  return (
    <>
      <TaskCard
        title="Tasks"
        tasks={tasks}
        canAddTask={true}
        onAddTask={addTask}
        onStartTask={startTask}
        onCompleteTask={completeTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        onDeleteSelectedTasks={deleteSelectedTasks}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default TaskManager;
