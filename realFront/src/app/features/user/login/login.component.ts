import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  content = "connexion";
  color = "yellow";
  
  loginForm : UntypedFormGroup= new UntypedFormGroup({
    username: new UntypedFormControl('',[Validators.required]),
    password: new UntypedFormControl('',[Validators.required])
  })

  submit(){
    console.log(this.loginForm.value)
  }

}
