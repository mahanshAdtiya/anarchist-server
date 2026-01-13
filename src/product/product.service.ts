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
                price: dto.price,
                description: dto.description,
                isFeatured: dto.isFeatured || false,
                isArchived: dto.isArchived || false,
                categoryId: dto.categoryId,
                colorId: dto.colorId,
                images: {
                    createMany: {
                        data: dto.images.map(image => ({ url: image.url })),
                    },
                },
                sizes: {
                    createMany: {
                        data: dto.sizeIds.map(sizeId => ({ sizeId })),
                    },
                },
            },
            include: {
                images: true,
                category: true,
                color: true,
                sizes: { include: { size: true } },
            },
        });
    }

    async getAllProducts() {
        return this.prisma.product.findMany({
            include: {
                images: true,
                category: true,
                color: true,
                sizes: { include: { size: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getProducts(dto: GetProductsDto) {    
        const whereClause: any = {
            categoryId: dto.categoryId || undefined,
            colorId: dto.colorId || undefined,
            sizes: dto.sizeIds?.length ? { some: { sizeId: { in: dto.sizeIds } } } : undefined,
        };
    
        if (dto.isFeatured !== null) {
            whereClause.isFeatured = dto.isFeatured;
        }
        if (dto.isArchived !== null) {
            whereClause.isArchived = dto.isArchived;
        }
    
        const products = await this.prisma.product.findMany({
            where: whereClause,
            include: {
                images: true,
                category: true,
                color: true,
                sizes: { include: { size: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return products;
    }

    async getProductById(params: IdDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: params.id },
            include: { 
                images: true,
                category: true,
                color: true,
                sizes: { include: { size: true } },
            },
        });

        if (!product) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async updateProduct(productId: string, dto: UpdateProductDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update products.', HttpStatus.FORBIDDEN);
        }
    
        const existingProduct = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true, sizes: true },
        });
    
        if (!existingProduct) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }
    
        const updateData: any = {};
    
        if (dto.name) updateData.name = dto.name;
        if (dto.price) updateData.price = dto.price;
        if (dto.categoryId) updateData.categoryId = dto.categoryId;
        if (dto.colorId) updateData.colorId = dto.colorId;
        if (dto.isFeatured !== undefined) updateData.isFeatured = dto.isFeatured;
        if (dto.isArchived !== undefined) updateData.isArchived = dto.isArchived;
        if (dto.description) updateData.description = dto.description;
    
        if (dto.images) {
            await this.prisma.image.deleteMany({ where: { productId } });
            updateData.images = {
                createMany: { data: dto.images.map(image => ({ url: image.url })) },
            };
        }
    
        if (dto.sizeIds) {
            await this.prisma.productSize.deleteMany({ where: { productId } });
            updateData.sizes = {
                createMany: { data: dto.sizeIds.map(sizeId => ({ sizeId })) },
            };
        }
    
        return this.prisma.product.update({
            where: { id: productId },
            data: updateData,
            include: { 
                images: true,
                category: true,
                color: true,
                sizes: { include: { size: true } },
            },
        });
    }
    

    async deleteProduct(params: IdDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete products.', HttpStatus.FORBIDDEN);
        }

        const product = await this.prisma.product.findUnique({ where: { id: params.id } });
        if (!product) {
            throw new AppError('Product not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.product.delete({ where: { id: params.id } });
    }
}
