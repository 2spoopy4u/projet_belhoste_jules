import { Component } from '@angular/core';
import { CreditCardManagerModule } from '../credit-card-manager/credit-card-manager.module';

@Component({
  selector: 'app-card-manager',
  imports: [CreditCardManagerModule],
  templateUrl: './card-manager.component.html',
  styleUrl: './card-manager.component.css'
})
export class CardManagerComponent {

}
