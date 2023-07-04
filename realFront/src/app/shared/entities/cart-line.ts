
export class CartLine {
    private id: number;
    private name: string;
    private price: number;
    private discount: number;
    private quantity: number;

    constructor(id : number | 0, name : string | "", price : number | 0, discount: number | 0, quantity: number | 0){
        this.id = id;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
    }

    public getId(){
        return this.id;
    }

    public setId(id : number){
        this.id = id;
    }

    public getName(){
        return this.name;
    }

    public setName(name : string){
        this.name = name;
    }

    public getPrice(){
        return this.price;
    }

    public getDiscount(){
        return this.discount;
    }

    public setDiscount(discount : number){
        this.discount = discount;
    }

    public getQuantity(){
        return this.quantity;
    }

    public setQuantity(quantity : number){
        this.quantity = this.quantity + quantity;
    }


}
