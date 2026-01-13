import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch, Query } from '@nestjs/common';

import { IdDto } from 'src/utils/data';

import { getUser } from 'src/auth/decorator';
import { ProductService } from './product.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { CreateProductDto, GetProductsDto, UpdateProductDto } from './data';


@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(JwtGuard, AdminGuard)
    createProduct(@Body() dto: CreateProductDto, @getUser() user: User) {
        return this.productService.createProduct(dto, user.type);
    }

    @Get()
    getProducts(@Query() query: GetProductsDto) {
        return this.productService.getProducts(query);
    }

    @Get(':id')
    getProductById(@Param() params: IdDto) {
        return this.productService.getProductById(params);
    }

    @Patch(':id')
    @UseGuards(JwtGuard, AdminGuard)
    updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto, @getUser() user: User) {
        return this.productService.updateProduct(id, dto, user.type);
    }     

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    deleteProduct(@Param() params: IdDto,  @getUser() user: User) {
        return this.productService.deleteProduct(params, user.type);
    }
}
