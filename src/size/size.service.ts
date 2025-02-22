import { IdDto, udpateDto } from 'src/utils/data';
import { CreateSizeDto} from './data';
import { PrismaService } from '../prisma/prisma.service';

import { Injectable, HttpStatus } from '@nestjs/common';
import { AppError } from '../utils/app-error';

@Injectable()
export class SizeService {
    constructor(private prisma: PrismaService) {}

    async createSize(dto: CreateSizeDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can create sizes.', HttpStatus.FORBIDDEN);
        }

        return this.prisma.size.create({ data: { name: dto.name, value: dto.value } });
    }

    async getAllSizes() {
        return this.prisma.size.findMany();
    }

    async getSizeById(params: IdDto) {
        const { id } = params;
        const size = await this.prisma.size.findUnique({ where: { id } });

        if (!size) {
            throw new AppError('Size not found.', HttpStatus.NOT_FOUND);
        }

        return size;
    }

    async updateSize(dto: udpateDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update sizes.', HttpStatus.FORBIDDEN);
        }

        const { id, name, value } = dto;

        const existingSize = await this.prisma.size.findUnique({ where: { id: id } });
        if (!existingSize) {
            throw new AppError('Size not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.size.update({
            where: { id: id },
            data: { name, value },
        });
    }

    async deleteSize(params: IdDto, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete sizes.', HttpStatus.FORBIDDEN);
        }

        const { id } = params;
        const size = await this.prisma.size.findUnique({ where: { id } });

        if (!size) {
            throw new AppError('Size not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.size.delete({ where: { id } });
    }
}