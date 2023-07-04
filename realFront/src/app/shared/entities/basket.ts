import { Cart } from "./cart";

export class Basket {
    private cart : Cart;
    private discount : number;
    private total : number = 0;

    constructor(cart : Cart, discount : number, total : number){
        this.cart = cart;
        this.discount = discount;
        this.total = total;
    }

    public getCart(){
        return this.cart;
    }

    public getDiscount(){
        return this.discount;
    }

    public setDiscount(discount : number){
        if(discount>0)
            this.discount = discount;
    }

    public getTotal(){
        return this.total;
    }

    public setTotal(total : number){
        this.total = total;
    }
}
