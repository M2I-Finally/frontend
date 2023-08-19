import { BasketLine } from "./basket-line";

export class Basket {
    private basketLines: BasketLine[];
    private total: number;
    private discount: number;

    constructor(basketLines: BasketLine[], total: number, discount: number){
        this.basketLines = basketLines;
        this.total = total;
        this.discount = discount;
    }

    public getBasketLines(){
        return this.basketLines;
    }

    public addLines(basketLine: BasketLine){
        this.basketLines.push(basketLine);
    }

    public removeLines(id : number){
        for (let index = 0; index < this.basketLines.length; index++) {       
            if ( id == this.basketLines[index].getProductId()){
                this.basketLines.splice(index, 1);                
            }
        }
    }

    public resetBasket(): void {
        this.basketLines = [];
    }

    public getTotal(){
        return this.total;
    }

    public setTotal(total : number){
        this.total = total;
    }

    public makeTotal(){
        let total = 0;
        this.basketLines.forEach((basketline)=> {
          total += basketline.getPrice()*basketline.getDiscount()*basketline.getQuantity();
        })

        return total;
     }

    public getDiscount(){
        return this.discount;
    }

    public setDiscount(discount : number){
        this.discount = discount;
    }
}
