import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputForm: UntypedFormGroup;
  error = false;
  constructor(private fb: UntypedFormBuilder, private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      code: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")])
    });
  }

  submit() {
    const code = this.inputForm.get('code').value;
    this.firestoreService.getThinkYe(code).subscribe(value => {
      if (value) {
        this.router.navigateByUrl(`${code}`);
      } else {
        this.error = true;
      }
    });
  }
}
