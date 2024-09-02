export interface Task {
    id: number;
    title: string;
    status: 'Todo' | 'Working' | 'Done';
  }
  
  export interface TaskCardProps {
    title: string;
    tasks: Task[];
    canAddTask?: boolean;
    onAddTask?: (taskTitle: string) => void;
    onStartTask?: (taskId: number) => void;
    onCompleteTask?: (taskId: number) => void;
    onEditTask?: (taskId: number, newTitle: string) => void;
    onDeleteTask?: (taskId: number) => void;
    onDeleteSelectedTasks?: (taskIds: number[]) => void;
    errorMessage?: string | null;
  }
  