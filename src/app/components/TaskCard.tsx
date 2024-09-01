import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
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
  onStartTask?: (taskId: number) => void;
  onCompleteTask?: (taskId: number) => void;
  onEditTask?: (taskId: number, newTitle: string) => void;
  onDeleteTask?: (taskId: number) => void;
  errorMessage?: string | null;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  tasks,
  canAddTask,
  onAddTask,
  onStartTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  errorMessage,
}) => {
  const [taskInput, setTaskInput] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState<string>('');

  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(taskInput);
      setTaskInput('');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const handleSaveEdit = () => {
    if (onEditTask && editTaskId !== null) {
      onEditTask(editTaskId, editTaskTitle);
      setEditTaskId(null);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      if (onDeleteTask) {
        onDeleteTask(taskId);
      }
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
            <div key={task.id} className={`${styles.task} ${styles[task.status.toLowerCase()]}`}>
              <div className={styles.taskContent}>
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTaskTitle(e.target.value)}
                    className={styles.taskInputInline}
                    autoFocus
                  />
                ) : (
                  <span>{task.title}</span>
                )}
              </div>
              <div className={styles.buttonContainer}>
                {editTaskId === task.id ? (
                  <button onClick={handleSaveEdit} className={styles.saveButton}>Save</button>
                ) : (
                  <>
                    {task.status === 'Todo' && (
                      <button onClick={() => handleEditTask(task)} className={styles.editButton}>Edit</button>
                    )}
                    {task.status === 'Todo' && (
                      <button onClick={() => onStartTask && onStartTask(task.id)} className={styles.startButton}>Start</button>
                    )}
                    {task.status === 'Working' && (
                      <button onClick={() => onCompleteTask && onCompleteTask(task.id)} className={styles.completeButton}>Complete</button>
                    )}
                    <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>Delete</button>
                  </>
                )}
              </div>
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
