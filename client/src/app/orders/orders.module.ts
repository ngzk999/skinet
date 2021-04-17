import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { BasketSummaryComponent } from '../shared/components/basket-summary/basket-summary.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [OrderDetailedComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
