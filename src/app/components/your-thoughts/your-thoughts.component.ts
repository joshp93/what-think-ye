import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ThinkYe } from 'src/app/models/classes/think-ye';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-your-thoughts',
  templateUrl: './your-thoughts.component.html',
  styleUrls: ['./your-thoughts.component.scss']
})
export class YourThoughtsComponent implements OnInit {
  inputForm: FormGroup;
  buttonDisabled: boolean;
  loading: boolean;
  submitText: string;
  thinkYe: ThinkYe;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private firestoreService: FirestoreService) {
    const thinkYeId = route.snapshot.url[0].path;
    firestoreService.getThinkYe(thinkYeId).subscribe(result => this.thinkYe = result);
  }

  ngOnInit(): void {
    this.setLoadingState(false);
    this.inputForm = this.fb.group({
      thought: new FormControl('', [Validators.required]),
    });
  }

  setLoadingState(isLoading: boolean) {
    isLoading ? this.buttonDisabled = true : this.buttonDisabled = false;
    isLoading ? this.submitText = "..." : this.submitText = "Login";
    this.loading = isLoading;
  }

  submit() {
    this.firestoreService.createThought(this.thinkYe.id, this.inputForm.controls['thought'].value).then(() => alert("Aren't you a clever boo?"));
  }

}
