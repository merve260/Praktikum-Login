export interface Task{
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: "High" | "Medium" | "Low" ;
}
