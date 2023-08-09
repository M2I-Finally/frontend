import { PaymentDto } from "./payment-dto";


export interface TodaySaleDto {

    total : number;
    seller : string ;
    payments :{amount: number; type: number}[];

}