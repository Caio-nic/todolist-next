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

  const startTask = (index: number) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = 'Working';
      return updatedTasks;
    });
  };

  const completeTask = (index: number) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = 'Done';
      return updatedTasks;
    });
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
        errorMessage={errorMessage}
      />
    </>
  );
};

export default TaskManager;
