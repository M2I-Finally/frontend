import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jwt } from 'src/app/shared/entities/jwt';
import jwt_decode from "jwt-decode";
import { Auth } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : UntypedFormGroup= new UntypedFormGroup({
    username: new UntypedFormControl('admin',[Validators.required]),
    password: new UntypedFormControl('admin',[Validators.required])
  })
  
  constructor(private router: Router, private authService : Auth,private toastr: ToastrService) {}
  
  // If user is already logged in we redirect him to the shop page
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    
    if(token != undefined) {
      let jwtDecoced : Jwt = jwt_decode(token!);
      const currentTimestamp = Math.floor(Date.now() / 1000);
    
      if(token && jwtDecoced.exp >= currentTimestamp){
        this.router.navigateByUrl('/shop')
      }
    }
  }
  
  submit() {
    this.authService.login(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value).subscribe({
      next: (loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigateByUrl('/shop')
        }
      },
      error: (error) => {
          if (error.status === 403) {
            this.toastr.error("Les identifiants sont invalides");  
          } else if(error.status === 0 ){
            this.toastr.info("Le serveur ne semble pas être démarré");  
          }
          else {   
            this.toastr.error(error.error.message);
          }
        }});
    }
}