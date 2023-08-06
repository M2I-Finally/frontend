
export class CartLine {
    private productId: number;
    private name: string;
    private price: number;
    private discount: number;
    private quantity: number;
    

    constructor(productId : number | 0, name : string | "", price : number | 0, discount: number | 0, quantity: number | 0){
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
    }

    public getProductId(){
        return this.productId;
    }

    public setProductId(productId : number){
        this.productId = productId;
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
        if (this.quantity> 0){
            this.quantity = this.quantity + quantity;
        }
    }

    //created this method for list-recap
    public getTotal(){
        let total :number = this.quantity * this.price * this.discount;
        return total;
    }

}
