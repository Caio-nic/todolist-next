import React, { useState } from "react";
import styles from "../../styles/home.module.css";
import TaskCard from "../../components/TaskCard";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'Todo' | 'Working' | 'Done';
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Função para adicionar tarefa
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
    setErrorMessage(null); // Limpar a mensagem de erro se a tarefa foi adicionada com sucesso
  };

  const startTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Working' as 'Working' } : task
      )
    );
  };

  const completeTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Done' as 'Done' } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.taskCards}>
          <TaskCard
            title="Tasks"
            tasks={tasks}
            canAddTask={true}
            onAddTask={addTask}
            onStartTask={startTask}
            onCompleteTask={completeTask}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

