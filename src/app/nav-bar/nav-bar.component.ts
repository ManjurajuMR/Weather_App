import { Component, EventEmitter, Output } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  currentDateTime = new Date();
  constant = Constants;
}
