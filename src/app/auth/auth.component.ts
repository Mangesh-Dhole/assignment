import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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

    }else{
      this.signUpForm.markAllAsTouched()
    }
  }



}
