import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

import { GenericValidator } from '../../../../core/shared/validations/generic-validator';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Define an instance of the validator for use with this form,
    this.genericValidator = new GenericValidator();
  }

  ngOnInit() {
    this.authService.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login() {
    this.loading = true;
    this.authService.authenticate(this.loginForm.value)
      .subscribe(
        () => {
          this.loading = false;
          // navigate back to our redirect url
          const to: string = this.authService.getRedirectUrl() || '';
          this.router.navigate([to]);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

}
