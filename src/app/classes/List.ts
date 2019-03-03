import Task from './Task';

class List {
  _id: string;
  active: boolean;
  name: string;
  userId: string;
  tasks: Task[];
  constructor(name: string, userId: string, active: boolean, tasks: Task[]) {
    this.active = active;
    this.name = name;
    this.tasks = tasks;
    this.userId = userId;
  }
}

export default List;