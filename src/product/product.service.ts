import { IdDto } from 'src/utils/data';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, GetProductsDto, UpdateProductDto } from './data';

import { AppError } from '../utils/app-error';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async createProduct(dto: CreateProductDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can create products.', HttpStatus.FORBIDDEN);
        }
    
        return this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                stock: dto.stock,
                categoryId: dto.categoryId,
                images: {
                    createMany: {
                        data: dto.images.map((image: { url: string }) => ({
                            url: image.url,
                        })),
                    },
                },
            },
            include: {
                images: true,
            },
        });
    }
    
    async getProducts(dto: GetProductsDto) {
        return this.prisma.product.findMany({
            where: {
                categoryId: dto.categoryId || undefined,
                variants: {
                    some: {
                        sizeId: dto.sizeId || undefined,
                        colorId: dto.colorId || undefined,
                    },
                },
            },
            include: {
                images: true,
            },
            orderBy: {
                createdAt: 'desc', 
            },
        });
    }

    async getProductById(params: IdDto) {
        const { id } = params;

        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { images: true, variants: true },
        });

        if (!product) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async updateProduct(dto: UpdateProductDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update products.', HttpStatus.FORBIDDEN);
        }
    
        const { productId } = dto;
    
        const existingProduct = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true, variants: true },
        });
    
        if (!existingProduct) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }
    
        
        const updateData: any = {};
    
        if (dto.name) updateData.name = dto.name;
        if (dto.description) updateData.description = dto.description;
        if (dto.price) updateData.price = dto.price;
        if (dto.stock) updateData.stock = dto.stock;
        if (dto.categoryId) updateData.categoryId = dto.categoryId;
    
        // Handle Images Update
        if (dto.images) {
            await this.prisma.image.deleteMany({ where: { productId } });
    
            updateData.images = {
                createMany: {
                    data: dto.images.map((image) => ({ url: image.url })),
                },
            };
        }
    
        // Handle Variants (Size & Color)
        if (dto.sizeId || dto.colorId) {
            const existingVariant = existingProduct.variants.find(
                (variant) => variant.sizeId === dto.sizeId && variant.colorId === dto.colorId
            );
    
            if (!existingVariant) {
                updateData.variants = {
                    create: {
                        sizeId: dto.sizeId,
                        colorId: dto.colorId,
                        stock: dto.stock || existingProduct.stock,
                    },
                };
            }
        }
    
        // Update Product
        return this.prisma.product.update({
            where: { id: productId },
            data: updateData,
            include: { images: true, variants: true },
        });
    }
    
    async deleteProduct(params: IdDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete products.', HttpStatus.FORBIDDEN);
        }

        const { id } = params;

        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.product.delete({ where: { id } });
    }
}
