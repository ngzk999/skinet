import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors = [];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      // [initial text, [Validators....]]
      displayName: [null, [Validators.required]],
      email: [null, 
        [Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], // sync validator
        [this.validateEmailNotTaken()] // async validator
      ],
      password: [null, [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$')]]
    })
  }

  // method to check if the email exists
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      // wait for 500 ms before talk with server to reduce server load
      return timer(500).pipe(
        // switchMap pass the inner observable to outer
        switchMap(() => {
          // if email is filled in
          if(!control.value){
            return of(null);
          }
          // if email is NOT filled in
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop')
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

}
