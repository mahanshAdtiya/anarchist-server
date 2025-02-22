import { IdDto, udpateDto } from 'src/utils/data';
import { CreateColorDto} from './data';
import { PrismaService } from '../prisma/prisma.service';

import { Injectable, HttpStatus } from '@nestjs/common';
import { AppError } from '../utils/app-error';

@Injectable()
export class ColorService {
    constructor(private prisma: PrismaService) {}

    async createColor(dto: CreateColorDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can create colors.', HttpStatus.FORBIDDEN);
        }

        return this.prisma.color.create({ data: { name: dto.name, value: dto.value } });
    }

    async getAllColors() {
        return this.prisma.color.findMany();
    }

    async getColorById(params: IdDto) {
        const { id } = params;

        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color) throw new AppError('Color not found.', HttpStatus.NOT_FOUND);

        return color;
    }

    async updateColor(dto: udpateDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update colors.', HttpStatus.FORBIDDEN);
        }

        const { id, name, value } = dto;

        const existingColor = await this.prisma.color.findUnique({ where: { id: id } });
        if (!existingColor) {
            throw new AppError('Color not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.color.update({
            where: { id: id },
            data: { name, value },
        });
    }

    async deleteColor(params: IdDto, userRole: string) {
        const { id } = params;

        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete colors.', HttpStatus.FORBIDDEN);
        }

        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color) throw new AppError('Color not found.', HttpStatus.NOT_FOUND);

        return this.prisma.color.delete({ where: { id } });
    }
}