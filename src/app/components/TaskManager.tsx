import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addTask = (taskTitle: string) => {
    if (taskTitle.length < 5 || taskTitle.length > 30) {
      setErrorMessage('A tarefa deve ter entre 5 e 30 caracteres.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      status: 'Todo',
    };

    setTasks([...tasks, newTask]);
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
    const task = tasks.find((task) => task.id === taskId);
    if (task && (task.status === 'Todo' || task.status === 'Working')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } else {
      alert('Você só pode deletar tarefas com status "Todo" ou "Working".');
    }
  };

  const deleteSelectedTasks = (taskIds: number[]) => {
    const deletableTasks = taskIds.filter((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      return task && (task.status === 'Todo' || task.status === 'Working');
    });

    if (deletableTasks.length > 0) {
      if (confirm(`Tem certeza que deseja deletar as tarefas selecionadas?`)) {
        setTasks(prevTasks => prevTasks.filter(task => !deletableTasks.includes(task.id)));
      }
    } else {
      alert('Nenhuma tarefa selecionada pode ser deletada. Apenas tarefas com status "Todo" ou "Working" podem ser removidas.');
    }
  };

  const editTask = (taskId: number, newTitle: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div>
      <TaskCard
        title="Task Manager"
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
    </div>
  );
};

export default TaskManager;
