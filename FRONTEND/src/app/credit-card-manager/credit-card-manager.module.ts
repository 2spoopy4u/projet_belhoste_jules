import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [FormComponent,ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[FormComponent,ListComponent]
})
export class CreditCardManagerModule { }
