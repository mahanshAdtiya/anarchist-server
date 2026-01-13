import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { CheckoutDto } from './data';


@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    @UseGuards(JwtGuard, AdminGuard)
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Post('checkout')
    async checkout(@Body() checkoutDto: CheckoutDto) {
        return this.ordersService.checkout(checkoutDto);
    }
}
