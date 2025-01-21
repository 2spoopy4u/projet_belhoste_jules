import { Component, inject } from '@angular/core';
import { CardCRUDService } from '../card-crud.service';
import { Card } from '../card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  selectedCard?:Card
  updateForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      Name: new FormControl('', [Validators.required,Validators.pattern('[A-z]*')]),
      Code: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      CCV: new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]),
      ExpirationMonth: new FormControl('', [Validators.required,Validators.pattern('[0-9][0-9]')]),
      ExpirationYear: new FormControl('', [Validators.required,Validators.pattern('[0-9][0-9][0-9][0-9]')]),

    });
  }
  cardService = inject(CardCRUDService);
  cards = this.cardService.getCards;

  ngOnInt() {
   ;
  }
  delete(code:number){
    this.cardService.delete(code);
  }
  selectCard(code:number){
    let card =this.cardService.getCards().find((card)=>card.Code===code);
    this.selectedCard= new Card(card!.Name,card!.Code,card!.CCV,card!.ExpirationMonth,card!.ExpirationYear);
    console.log(this.selectedCard);

  }
  update(){
    console.log(this.updateForm.value);
    this.cardService.update(this.updateForm.value);
  }
}
