import Item from './Item';

class List {
  _id: string;
  name: string;
  userId: string;
  items: Item[];
  constructor(name: string, userId: string, items: Item[]) {
    this.name = name;
    this.userId = userId;
    this.items = items;
  }
}

export default List;