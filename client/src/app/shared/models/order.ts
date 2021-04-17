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
    shippingPrice:   number;
    deliveryMethod:  string;
    orderItems:      IOrderItem[];
    subTotal:        number;
    status:          number;
    paymentIntentId: string;
    total:           number;
}

export interface IOrderItem {
    id:          number;
    productName:   string;
    pictureUrl:    string;
    price:       number;
    quantity:    number;
}
