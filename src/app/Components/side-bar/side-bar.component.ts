import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { appProviderRouter } from '../../app.routes';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
