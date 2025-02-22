import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto, udpateDto } from 'src/utils/data';

import { CreateSizeDto} from './data';
import { getUser } from 'src/auth/decorator';
import { SizeService } from './size.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@Controller('sizes')
@UseGuards(JwtGuard)
export class SizeController {
    constructor(private sizeService: SizeService) {}

    @Post()
    @UseGuards(AdminGuard)
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
    @UseGuards(AdminGuard)
    updateSize(@Body() dto: udpateDto, @getUser() user: User) {
        return this.sizeService.updateSize(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteSize(@Param() params: IdDto, @getUser() user: User) {
        return this.sizeService.deleteSize(params, user.type);
    }
}
