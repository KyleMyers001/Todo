import Task from './Task';

class List {
  _id: string;
  name: string;
  userId: string;
  tasks: Task[];
  constructor(name: string, userId: string, tasks: Task[]) {
    this.name = name;
    this.userId = userId;
    this.tasks = tasks;
  }
}

export default List;