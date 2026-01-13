import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto, updateDto } from 'src/utils/data';

import { CreateSizeDto} from './data';
import { getUser } from 'src/auth/decorator';
import { SizeService } from './size.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@Controller('sizes')
export class SizeController {
    constructor(private sizeService: SizeService) {}

    @Post()
    @UseGuards(JwtGuard, AdminGuard)
    createSize(@Body() dto: CreateSizeDto, @getUser() user: User) {
        return this.sizeService.createSize(dto, user.type);
    }

    @Get()
    getAllSizes() {
        return this.sizeService.getAllSizes();
    }

    @Get(':id')
    getSizeById(@Param() params: IdDto) {
        return this.sizeService.getSizeById(params);
    }

    @Patch()
    @UseGuards(JwtGuard, AdminGuard)
    updateSize(@Body() dto: updateDto, @getUser() user: User) {
        return this.sizeService.updateSize(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    deleteSize(@Param() params: IdDto, @getUser() user: User) {
        return this.sizeService.deleteSize(params, user.type);
    }
}
