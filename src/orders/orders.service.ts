import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './data';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async getOrders() {
        return this.prisma.order.findMany({
            where: { isPaid: true },
            include: { orderItems: { include: { product: true } } }
        });
    }

    async checkout(checkoutDto: CheckoutDto) {
        const { email, phone, shippingAddress, billingAddress, items } = checkoutDto;
    
        if (!email || !phone || !shippingAddress || !billingAddress) {
            throw new BadRequestException('Email, phone, shipping address, and billing address are required');
        }
    
        if (!items.length) {
            throw new BadRequestException('Order must contain at least one item');
        }
    
        const itemsWithPrices = await Promise.all(
            items.map(async (item) => {
                const product = await this.prisma.product.findUnique({
                    where: { id: item.productId },
                    select: { price: true }
                });
    
                if (!product) {
                    throw new BadRequestException(`Product with ID ${item.productId} not found`);
                }
    
                return { ...item, price: Number(product.price) }; 
            })
        );
    
        const totalPrice = itemsWithPrices.reduce((sum, item) => sum + item.price, 0);
    
        const order = await this.prisma.order.create({
            data: {
                guestEmail: email,
                guestPhone: phone,
                price: totalPrice,
                isPaid: true,
                shippingAddress: `${shippingAddress.state}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.addressLine}`, 
                billingAddress: `${billingAddress.state}, ${billingAddress.city}, ${billingAddress.postalCode}, ${billingAddress.addressLine}`,    
                orderItems: {
                    create: items.map(item => ({
                        productId: item.productId,
                        sizeId: item.sizeId, 
                    }))
                }
            },
            include: { orderItems: true }
        });        
    
        return order;
    }
    
}
