import { Component, Input, ViewChild } from '@angular/core';
import Slider from '../../classes/Slider';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  @Input() headerComponent;
  @Input() listComponent;
  @Input() taskComponent;
  @ViewChild('siteMenu') siteMenu;
  slider: Slider;
  isMenuDisplayed: boolean;
  ngAfterViewInit() {
    const menu = this.siteMenu.nativeElement;
    // const container = menu.parentElement.parentElement; // This is the todo container
    const container = menu.parentElement;


    // It's probably the issue.  
    // It's used for calculating the start and end X.
    // That's my problem.
    // Maybe I just check the width of the menu itself? 
    // Why do I need the container?
    // I don't think I do.
    this.slider = new Slider(container, 800, menu);
  }

  showMenu(): void {
    this.isMenuDisplayed = true;
    this.slider.slideIn(null);
  }

  hideMenu(): void {
    const callback = () => {
      this.isMenuDisplayed = false;
    }
    this.slider.slideOut(callback);
  }
  
  toggleMenu(): void {
    if(this.isMenuDisplayed) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  deleteActiveList(): void {
    this.listComponent.deleteList(this.taskComponent.activeList);
    this.hideMenu();
    this.headerComponent.hideTasks();
  }
}
