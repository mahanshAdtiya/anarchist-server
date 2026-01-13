import { IdDto} from 'src/utils/data';
import { CreateCategoryDto, UpdateCategoryDto} from './data';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpStatus } from '@nestjs/common';
import { AppError } from 'src/utils/app-error';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async createCategory(dto: CreateCategoryDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can create categories.', HttpStatus.FORBIDDEN);
        }

        return this.prisma.category.create({
            data: {
                name: dto.name,
                description: dto.description,
                billboard: {
                    connect: { id: dto.billboardId },
                },
            },
        });
    }

    async getAllCategories() {
        return this.prisma.category.findMany({
            include: { billboard: true },
        });
    }

    async getCategoryById(params: IdDto) {
        const { id } = params;
        const category = await this.prisma.category.findUnique({ 
            where: { id },
            include: { billboard: true },
        });

        if (!category) {
            throw new AppError('Category not found.', HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async updateCategory(dto: UpdateCategoryDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update categories.', HttpStatus.FORBIDDEN);
        }

        const { id, name, description, billboardId } = dto;

        const existingCategory = await this.prisma.category.findUnique({ where: { id } });
        if (!existingCategory) {
            throw new AppError('Category not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.category.update({
            where: { id },
            data: {
                name,
                description,
                billboard: billboardId ? { connect: { id: billboardId } } : undefined,
            },
        });
    }

    async deleteCategory(params: IdDto, userRole: string) {
        const { id } = params;

        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete categories.', HttpStatus.FORBIDDEN);
        }

        const category = await this.prisma.category.findUnique({ where: { id } });

        if (!category) {
            throw new AppError('Category not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.category.delete({ where: { id } });
    }
}
