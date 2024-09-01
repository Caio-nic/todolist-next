import React, { useState, KeyboardEvent } from 'react';
import styles from '../styles/TaskCard.module.css';
import TextField from './TextField';
import Button from './Button';

interface Task {
  id: number;
  title: string;
  status: 'Todo' | 'Working' | 'Done';
}

interface TaskCardProps {
  title: string;
  tasks: Task[];
  canAddTask?: boolean;
  onAddTask?: (taskTitle: string) => void;
  onStartTask?: (taskIndex: number) => void;
  onCompleteTask?: (taskIndex: number) => void;
  errorMessage?: string | null;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  tasks,
  canAddTask,
  onAddTask,
  onStartTask,
  onCompleteTask,
  errorMessage,
}) => {
  const [taskInput, setTaskInput] = useState<string>('');

  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(taskInput);
      setTaskInput('');
    }
  };

  return (
    <div className={styles.taskCard}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <p className={styles.noTasks}>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              <div className={`${styles.task} ${styles[task.status.toLowerCase()]}`}>
                <span>{task.title}</span>
              </div>
              {onStartTask && task.status === 'Todo' && (
                <button onClick={() => onStartTask(task.id)}>Start</button>
              )}
              {onCompleteTask && task.status === 'Working' && (
                <button onClick={() => onCompleteTask(task.id)}>Complete</button>
              )}
            </div>
          ))
        )}
      </div>
      {canAddTask && onAddTask && (
        <div className={styles.addTaskContainer}>
          <TextField
            type="text"
            placeholder="Add a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className={styles.taskInput}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleAddTask();
              }
            }}
          />
          <Button onClick={handleAddTask} titleButton='Add'/>
        </div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TaskCard;
