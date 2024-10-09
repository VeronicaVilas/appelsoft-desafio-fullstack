import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)

  logout() {
    this.router.navigate(['/']);
  }
}
