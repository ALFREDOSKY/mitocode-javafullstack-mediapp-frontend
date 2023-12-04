import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import '../../../assets/login-animation.js';
import { LoginService } from 'src/app/service/login.service';
import { NgIf } from '@angular/common';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MaterialModule, FormsModule, RouterLink, NgIf]
})
export class LoginComponent {

  username: string;
  password: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router){
    
  }

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.jwtToken)
      this.router.navigate(['pages/dashboard']);
    });
  }

  ngAfterViewInit(){
    (window as any).initialize();
  }

}
