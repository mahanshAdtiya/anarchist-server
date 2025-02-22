import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto, udpateDto } from 'src/utils/data';

import { CreateColorDto} from './data';
import { getUser } from 'src/auth/decorator';
import { ColorService } from './color.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@Controller('colors')
@UseGuards(JwtGuard)
export class ColorController {
    constructor(private colorService: ColorService) {}

    @Post()
    @UseGuards(AdminGuard)
    createColor(@Body() dto: CreateColorDto, @getUser() user: User) {
        return this.colorService.createColor(dto, user.type);
    }

    @Get()
    getAllColors() {
        return this.colorService.getAllColors();
    }

    @Get(':id')
    getColorById(@Param() params: IdDto) {
        return this.colorService.getColorById(params);
    }

    @Patch()
    @UseGuards(AdminGuard)
    updateColor(@Body() dto: udpateDto, @getUser() user: User) {
        return this.colorService.updateColor(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteColor(@Param() params: IdDto, @getUser() user: User) {
        return this.colorService.deleteColor(params, user.type);
    }
}
