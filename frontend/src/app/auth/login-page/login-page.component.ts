import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginPayload } from '../shared/login.payload';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginPayload!: LoginPayload;
  loginForm!: FormGroup;
  props!: any;
  loginService!: any;
  constructor(private authService: AuthService, private router: Router) { 
    this.loginPayload = {
      email: "",
      password: ""
    }
    this.props = {
      email: "",
      token: ""
    }
  }
  
  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login(){

    this.loginPayload.email = this.loginForm.get('email')?.value;
    this.loginPayload.password = this.loginForm.get('password')?.value;
    
    this.loginService = this.authService.login(this.loginPayload).subscribe((params) => {
      this.props.token = params.token;
      localStorage.setItem('token', params.token);
      localStorage.setItem('email', this.loginPayload.email);

      this.router.navigate(['/swipe']);
      alert("Ai fost logat cu succes");
      console.log('Login Successful');
    }, () => {
      this.router.navigate(['/login']);
      alert("Contul nu exista");
      console.log('Login Failed');
    });

  }
  

}
