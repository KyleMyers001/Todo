import { Component, Input, ViewChild } from '@angular/core';
import Slider from '../../classes/Slider';
import SiteConfiguration from 'src/app/classes/SiteConfiguration';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
    const slideDuration = 800;
    this.slider = new Slider(container, slideDuration, menu);
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

  enableRenamingOfList(): void {
    if(SiteConfiguration.isMobile()) {
      this.headerComponent.enableRenamingOfList();
    } else {
      this.hideMenu();
      this.listComponent.enableRenamingOfList();
    }
  }

  deleteActiveList(): void {
    this.listComponent.deleteList(this.listComponent.activeList);
    this.hideMenu();
    this.headerComponent.hideTasks();
  }
}
