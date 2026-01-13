import { IdDto } from 'src/utils/data';
import { CreateBillboard, updateBillboard} from './data';
import { PrismaService } from '../prisma/prisma.service';

import { Injectable, HttpStatus } from '@nestjs/common';
import { AppError } from '../utils/app-error';

@Injectable()
export class BillboardService {
    constructor(private prisma: PrismaService) {}

    async createBillboard(dto: CreateBillboard, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can create Billboards.', HttpStatus.FORBIDDEN);
        }

        return this.prisma.billboard.create({ data: { label: dto.label, imageUrl: dto.imageUrl } });
    }

    async getAllBillboards() {
        return this.prisma.billboard.findMany();
    }

    async getBillboardById(params: IdDto) {
        const { id } = params;

        const billboard = await this.prisma.billboard.findUnique({ where: { id } });
        if (!billboard) throw new AppError('Billboard not found.', HttpStatus.NOT_FOUND);

        return billboard;
    }

    async updateBillboard(dto: updateBillboard, userRole: string) {
        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can update colors.', HttpStatus.FORBIDDEN);
        }

        const {id, label, imageUrl} = dto;

        const existingBillboard = await this.prisma.billboard.findUnique({ where: { id: id } });
        if (!existingBillboard) {
            throw new AppError('Billboard not found.', HttpStatus.NOT_FOUND);
        }

        return this.prisma.billboard.update({
            where: { id: id },
            data: { label, imageUrl },
        });
    }

    async deleteBillboard(params: IdDto, userRole: string) {
        const { id } = params;

        if (userRole !== 'ADMIN') {
            throw new AppError('Only admins can delete colors.', HttpStatus.FORBIDDEN);
        }

        const billboard = await this.prisma.billboard.findUnique({ where: { id } });
        if (!billboard) throw new AppError('Billboard not found.', HttpStatus.NOT_FOUND);

        return this.prisma.billboard.delete({ where: { id } });
    }
}