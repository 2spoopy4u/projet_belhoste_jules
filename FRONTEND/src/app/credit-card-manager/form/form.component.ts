import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CardCRUDService } from '../card-crud.service';
@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  cardForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.cardForm = this.formBuilder.group({
      Name: new FormControl('', [Validators.required,Validators.pattern('[A-z]*')]),
      Code: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      CCV: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      ExpirationMonth: new FormControl('', [Validators.required,Validators.pattern('[0-9][0-9]')]),
      ExpirationYear: new FormControl('', [Validators.required,Validators.pattern('[0-9][0-9][0-9][0-9]')]),

    });
  }
  cardService = inject(CardCRUDService);
  ngOnInit() {
  }

  submit() {
    this.cardService.insert(this.cardForm.value);
    console.log(this.cardService.getCards());
  }
}
