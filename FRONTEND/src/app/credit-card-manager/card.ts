export class Card {
    Name:string
    Code:number
    CCV:number
    ExpirationMonth:number
    ExpirationYear:number
    constructor(Name:string,Code:number,CCV:number,ExpirationMonth:number,ExpirationYear:number){
        this.Name = Name;
        this.Code = Code;
        this.CCV = CCV;
        this.ExpirationMonth = ExpirationMonth;
        this.ExpirationYear = ExpirationYear;
    }
    
}
