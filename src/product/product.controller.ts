import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto } from 'src/utils/data';

import { getUser } from 'src/auth/decorator';
import { ProductService } from './product.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { CreateProductDto, GetProductsDto, UpdateProductDto } from './data';


@Controller('products')
@UseGuards(JwtGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(AdminGuard)
    createProduct(@Body() dto: CreateProductDto, @getUser() user: User) {
        return this.productService.createProduct(dto, user.type);
    }

    @Get()
    getProducts(@Body() dto: GetProductsDto) {
        return this.productService.getProducts(dto);
    }

    @Get(':id')
    getProductById(@Param() params: IdDto) {
        return this.productService.getProductById(params);
    }

    @Patch()
    @UseGuards(AdminGuard)
    updateProduct(@Body() dto: UpdateProductDto, @getUser() user: User) {
        return this.productService.updateProduct(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteProduct(@Param() params: IdDto,  @getUser() user: User) {
        return this.productService.deleteProduct(params, user.type);
    }
}
