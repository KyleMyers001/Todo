class Task {
  _id: number;
  listId: string;
  name: string;
  constructor(id: number, listId: string, name: string) {
    this._id = id;
    this.listId = listId;
    this.name = name;
  }
}

export default Task;