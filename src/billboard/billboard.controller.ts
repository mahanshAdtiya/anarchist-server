import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto} from 'src/utils/data';
import { CreateBillboard, updateBillboard } from './data';


import { getUser } from 'src/auth/decorator';
import { BillboardService } from './billboard.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@Controller('billboards')
export class BillboardController {
    constructor(private billboardService: BillboardService) {}

    @Post()
    @UseGuards(JwtGuard, AdminGuard)
    createColor(@Body() dto: CreateBillboard, @getUser() user: User) {
        return this.billboardService.createBillboard(dto, user.type);
    }

    @Get()
    getAllBillboard() {
        return this.billboardService.getAllBillboards();
    }

    @Get(':id')
    getBillboardId(@Param() params: IdDto) {
        return this.billboardService.getBillboardById(params);
    }

    @Patch()
    @UseGuards(JwtGuard, AdminGuard)
    updateBillboard(@Body() dto: updateBillboard, @getUser() user: User) {
        return this.billboardService.updateBillboard(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    deleteBillboard(@Param() params: IdDto, @getUser() user: User) {
        return this.billboardService.deleteBillboard(params, user.type);
    }
}
