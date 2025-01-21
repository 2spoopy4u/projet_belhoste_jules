import { Injectable, signal } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardCRUDService {

  constructor() { }
  private valSignal = signal<Card[]>([]);
  get getCards() {
    return this.valSignal;
  }

  update(newCard:Card){
    this.valSignal.update((cards)=>{
      let index = cards.findIndex((card)=>card.Code === newCard.Code)
      console.log(index)
      cards[index]=newCard;
      return cards;
    });
  }
  insert(newCard:Card){
    let nbCardWithCode = this.getCards().filter((card)=>card.Code===newCard.Code).length;
    if(nbCardWithCode===0){
    this.valSignal.update((cards)=>{
      cards=[...cards,newCard];
      return cards;
    });
  }
  }
  delete(code:number){
    this.valSignal.update((cards)=>{
      cards = cards.filter((card)=>card.Code!==code);
      return cards;
    })
  }
}
