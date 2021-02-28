import {IAddress} from './address';

export interface IOrderToCreate {
    basketId:         string;
    deliveryMethodId: number;
    shipToAddress:    IAddress;
}

export interface IOrder {
    id:              number;
    buyerEmail:      string;
    orderDate:       string;
    shipToAddress:   IAddress;
    deliveryMethod:  string;
    orderItems:      IOrderItem[];
    subtotal:        number;
    status:          number;
    paymentIntentId: string;
}

export interface IOrderItem {
    id:          number;
    productName:   string;
    pictureUrl:    string;
    price:       number;
    quantity:    number;
}
