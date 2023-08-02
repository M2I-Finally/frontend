export class PaymentDtoList {
    private amount: number;
    // 0 - cash, 1 - card, 2-other
    private type: number;

    constructor ( amount: number | 0, type : number){
        this.amount = amount;
        this.type = type;
    }

    
    public getAmount() : number {
        return this.amount
    }
    
    
    public setAmount(amount : number) {
        this.amount = amount;
    }
    
    public getType() : number {
        return this.type
    }
    
    
    public setType(type : number) {
        this.type = type;
    }

}


