import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MaterialModule } from 'src/app/material/material.module';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[MaterialModule, RouterLink]
})
export class ProfileComponent implements OnInit {

  username: string;
  role: string;
  
  ngOnInit(): void {    
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));
    //console.log(decodeToken);
    
    this.username = decodeToken.sub;
    this.role = decodeToken.role;
  }

}
