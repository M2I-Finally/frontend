import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  content = "connexion";
  color = "yellow";

  constructor(private router: Router, private authService : AuthService,private toastr: ToastrService) {}
  
  loginForm : UntypedFormGroup= new UntypedFormGroup({
    username: new UntypedFormControl('admin',[Validators.required]),
    password: new UntypedFormControl('admin',[Validators.required])
  })

  submit(){
   this.authService.login(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value).subscribe({
    next: (loggedIn: boolean) => {
      if (loggedIn) {
        console.log("redirection vers shop")
        this.router.navigateByUrl('/shop')
      } else {
        console.log(loggedIn + " login non valide")
      }
    },
    error: (error) => {
      if (error.status === 400) {
        console.log("Erreur 400: Identifiants invalides");        
      } else {
        console.log("Erreur inattendue: " + error.error.message);
        this.toastr.error(error.message)        
      }
      this.toastr.error(error.error.message)
    }
  });
  }

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
}