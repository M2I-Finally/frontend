import { CartLine } from "./cart-line";

export class Cart {
    private cartLines: CartLine[];
    private total: number;
    private discount: number;

    constructor(cartLines: CartLine[], total: number, discount: number){
        this.cartLines = cartLines;
        this.total = total;
        this.discount = discount;
    }

    public getCartLines(){
        return this.cartLines;
    }

    public addLines(cartLine: CartLine){
        this.cartLines.push(cartLine);
    }

    public removeLines(id : number){
        for (let index = 0; index < this.cartLines.length; index++) {       
            if ( id == this.cartLines[index].getId()){
                this.cartLines.splice(index, 1);                
            }
        }
    }

    public resetCart(): void {
        this.cartLines = [];
    }

    public getTotal(){
        return this.total;
    }

    public setTotal(total : number){
        this.total = total;
    }

    makeTotal(){
        let total = 0;
        this.cartLines.forEach((cartline)=> {
          total += cartline.getPrice()*cartline.getDiscount()*cartline.getQuantity();
        })
        this.setTotal(total);
    }
    

    public getDiscount(){
        return this.discount;
    }

    public setDiscount(discount : number){
        this.discount = discount;
    }
}
