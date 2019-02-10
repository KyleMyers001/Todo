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
    const container = menu.parentElement.parentElement;
    // this.slider = new Slider(container, 5000, menu);
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
    this.headerComponent.showMenu = false;
    this.headerComponent.goBack();
  }
}
