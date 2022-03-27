import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  inputForm: FormGroup;
  buttonDisabled: boolean;
  loading: boolean;
  registerText: string;
  errors: Map<string, string>;

  constructor(private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    this.setLoadingState(false);
    this.inputForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    })
    this.initErrors();
  }

  initErrors() {
    this.errors = new Map<string, string>();
    this.errors.set("email", "");
    this.errors.set("password", "");
    this.errors.set("passwordConfirm", "");
  }

  checkValid() {
    if (this.inputForm.invalid) {
      this.errors.forEach((value, key, mp) => {
        mp.set(key, this.inputForm.get(key).hasError("email") ? `${this.inputForm.value.email} is not a valid email address` : "");
        if (mp.get(key) == "") {
          mp.set(key, this.inputForm.get(key).hasError("required") ? `${key} is required` : "");
        }
      })
    } else {
      this.errors.forEach((i) => {
        i = "";
      });
    }
  }

  register() {
    this.setLoadingState(true);
    this.auth.registerUser(this.inputForm.value.email, this.inputForm.value.password)
      .finally(() => this.setLoadingState(false));
  }

  setLoadingState(isLoading: boolean) {
    isLoading ? this.buttonDisabled = true : this.buttonDisabled = false;
    isLoading ? this.registerText = "..." : this.registerText = "Login";
    this.loading = isLoading;
  }

}
