import React, { useState } from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
  status: 'Todo' | 'Working' | 'Done';
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addTask = (title: string) => {
    if (title.length < 5 || title.length > 30) {
      setErrorMessage('A tarefa deve ter entre 5 e 30 caracteres.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      status: 'Todo',
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setErrorMessage(null);
  };

  const startTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Working' } : task
      )
    );
  };

  const completeTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Done' } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const deleteAllTasks = () => {
    setTasks([]); // Limpa a lista de tarefas
  };

  const editTask = (taskId: number, newTitle: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <TaskCard
      title="Tasks"
      tasks={tasks}
      canAddTask={true}
      onAddTask={addTask}
      onStartTask={startTask}
      onCompleteTask={completeTask}
      onEditTask={editTask}
      onDeleteTask={deleteTask}
      onDeleteAllTasks={deleteAllTasks} // Passando a função deleteAllTasks para o TaskCard
      errorMessage={errorMessage}
    />
  );
};

export default TaskManager;
