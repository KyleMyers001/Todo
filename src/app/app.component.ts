import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo';
  list: Item[];
  addItemContainer: any;
  idCounter: number;

  constructor(private appService: AppService) {
    this.list = appService.getToDoList();
    this.idCounter = 0;
    window.onload = this.assignInputBehavior;
  }

  forEach(list, func): void {
    Array.prototype.forEach.call(list, func);
  }

  assignInputBehavior(): void {
    const inputs = document.querySelectorAll('.list-group input[type="text"]');
    const self = this;
    this.forEach(inputs, (input) => {
      input.onkeypress = function(e) {
        if (e.keyCode === 13) {
          var selector = '#' + input.id;
        //  var name = document.querySelector(selector).value;
          self.toggleTextBox(selector);
        }
      };
    });
  }

  deleteItem(item): void {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] === item) {
        this.list.splice(i, 1);
        return;
      }
    }
  }

  addItemToList(name): boolean {
    const item = new Item;
    item.id = this.idCounter;
    item.name = name;
    this.list.push(item);
    this.idCounter += 1;
    return false;
  }

  saveTextBox(): void {

  }

  toggleTextBox(selector): void {
    document.querySelector(selector).toggleAttribute('disabled');
  }

  showAddForm(): void {
    document.querySelector('#addForm').classList.toggle('hidden');
  }
}

class Item {
  id: number;
  name: string;
}
