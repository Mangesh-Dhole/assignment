import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signUpForm!: FormGroup;
  alreadyHaveAccount: boolean = false;
  forgotPassword: boolean = false

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpForm()
  }

  createSignUpForm(): FormGroup{
    return this.signUpForm = this.fb.group({
      fname: [null],
      lname: [null],
      userName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]{2,100}$')]],
      password: [null, [Validators.required]],
      cPassword: [null, [Validators.required]],
    })
  }

  onSignUp(){
    if(this.signUpForm.valid){
      let {email: userEmail, userName} = this.signUpForm.value
      this._authService.getAllUser
        .subscribe(res => {
          let match = res.find(item => item.email === userEmail || item.userName === userName)
          console.log(match);
          if(!match){
            this._authService.addUser(this.signUpForm.value)
              .subscribe(res => {
                this.signUpForm.reset()
                this.alreadyHaveAccount = true
                alert('user added successfully')
              })
          }else{
            alert('user already exist')
          }
        })
     
    }else{
      this.signUpForm.markAllAsTouched()
    }
  }

  onLoginUser(loginForm: NgForm){
    if(loginForm.valid){
      let {password, userName} = loginForm.value
      this._authService.getAllUser
        .subscribe(res => {
          let match = res.find(e => e.userName === userName && e.password === password)
          if(match){
            this._router.navigate(['/home'])
          }else{
            alert('please provide valid userName and password')
          }
        })
    }
  }


}
