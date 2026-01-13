import { PrismaService } from '../prisma/prisma.service';

import { Injectable, HttpStatus } from '@nestjs/common';
import { AppError } from '../utils/app-error';
import { updateUser } from './data';
import { User } from '@prisma/client';

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService) {}

    async updateUser(dto: updateUser, user: User){

        const {name, email} = dto;
        const existingUser = await this.prisma.admin.findUnique({where: {id: user.id}})
        if(!existingUser){
            throw new AppError('User not found.', HttpStatus.NOT_FOUND);
        }
        return this.prisma.admin.update({
            where: { id: user.id },
            data: { name, email },
        });
    }
}