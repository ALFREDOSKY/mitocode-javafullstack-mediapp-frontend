import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Menu } from 'src/app/model/menu';
import { LoginService } from 'src/app/service/login.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgFor],
})
export class LayoutComponent implements OnInit {
  menus: Menu[];

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe((data) => {
      this.menus = data;
    });
  }

  showProfile(){
    this.router.navigate(['/pages/profile']);
  }

  logout() {
    this.loginService.logout();
  }
}
