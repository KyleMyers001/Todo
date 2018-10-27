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
    this.list = new Array();
    appService.getTodoList().subscribe((data) => {
      data.forEach((item) => {
        this.list.push(item);
      });
    });
    this.idCounter = 0;
    window.onload = this.assignInputBehavior.bind(this, this);
  }

  assignInputBehavior(instance): void {
    const inputs = document.querySelectorAll('.list-group input[type="text"]');
    Array.prototype.forEach.call(inputs, (input) => {
      input.onkeypress = function(e) {
        if (e.keyCode === 13) {
          const textbox = <HTMLInputElement>document.querySelector('#' + input.id);
          const name = textbox.value;
          const id = Number(textbox.id.split("_")[1]);
          const item = new Item(id, name);
          instance.toggleTextBox('#' + input.id);
          instance.updateTodoItem(item);
        }
      };
    });
  }


  updateTodoItem(item): void {
    this.appService.updateTodoItem(item);
  }

  deleteItem(item): void {
    this.appService.deleteTodoItem(item);
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] === item) {
        this.list.splice(i, 1);
        return;
      }
    }
  }

  addTodoItem(name): boolean {
    const item = new Item(null, name);
    this.appService.addTodoItem(item);
    this.list.push(item);

    var input = <HTMLInputElement>document.querySelector('#addItemInput');
    input.value = '';
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
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
