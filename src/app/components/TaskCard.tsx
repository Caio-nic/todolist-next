import React, { useState, ChangeEvent } from "react";
import styles from "../styles/TaskCard.module.css";
import TextField from "./TextField";
import Button from "./Button";
import { Task, TaskCardProps } from "../../types";

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  tasks,
  canAddTask,
  onAddTask,
  onStartTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  onDeleteSelectedTasks,
  errorMessage,
}) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState<string>("");
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(taskInput);
      setTaskInput("");
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
    const task = tasks.find((task) => task.id === taskId);
    if (task && (task.status === "Todo" || task.status === "Working")) {
      if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
        if (onDeleteTask) {
          onDeleteTask(taskId);
        }
      }
    }
  };

  const handleSelectTask = (taskId: number) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteSelectedTasks = () => {
    const deletableTasks = selectedTasks.filter((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      return task && (task.status === "Todo" || task.status === "Working");
    });

    if (deletableTasks.length > 0) {
      const confirmed = confirm(
        "Tem certeza que deseja deletar as tarefas selecionadas?"
      );
      if (confirmed) {
        onDeleteSelectedTasks && onDeleteSelectedTasks(deletableTasks);
        setSelectedTasks([]);
      }
    } else {
      alert(
        'Nenhuma tarefa selecionada pode ser deletada. Apenas tarefas com status "Todo" ou "Working" podem ser removidas.'
      );
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
            <div
              key={task.id}
              className={`${styles.task} ${styles[task.status.toLowerCase()]}`}
            >
              <div className={styles.taskContent}>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleSelectTask(task.id)}
                  className={styles.checkbox}
                  disabled={task.status === "Done"}
                />
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditTaskTitle(e.target.value)
                    }
                    className={styles.taskInputInline}
                    autoFocus
                  />
                ) : (
                  <span>{task.title}</span>
                )}
              </div>
              <div className={styles.buttonContainer}>
                {editTaskId === task.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    {task.status !== "Done" && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    )}
                    {task.status === "Todo" && (
                      <button
                        onClick={() => handleEditTask(task)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                    )}
                    {task.status === "Todo" && (
                      <button
                        onClick={() => onStartTask && onStartTask(task.id)}
                        className={styles.startButton}
                      >
                        Start
                      </button>
                    )}
                    {task.status === "Working" && (
                      <button
                        onClick={() =>
                          onCompleteTask && onCompleteTask(task.id)
                        }
                        className={styles.completeButton}
                      >
                        Complete
                      </button>
                    )}
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <Button onClick={handleAddTask} titleButton="Add" />
        </div>
      )}
      <Button
        onClick={handleDeleteSelectedTasks}
        className={`${styles.deleteAllButton} ${
          selectedTasks.length === 0 ? styles.disabled : ""
        }`}
        disabled={selectedTasks.length === 0}
        titleButton="Delete Selected Tasks"
      />

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TaskCard;
