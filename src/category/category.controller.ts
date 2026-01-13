import { User } from '@prisma/client';
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';

import { IdDto} from 'src/utils/data';
import { CreateCategoryDto, UpdateCategoryDto} from './data';
import { getUser } from 'src/auth/decorator';
import { CategoryService } from './category.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtGuard, AdminGuard)
    createCategory(@Body() dto: CreateCategoryDto, @getUser()  user: User) {
        return this.categoryService.createCategory(dto, user.type);
    }

    @Get()
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    getCategoryById(@Param() params: IdDto) {
        return this.categoryService.getCategoryById(params);
    }

    @Patch()
    @UseGuards(JwtGuard, AdminGuard)
    updateCategory(@Body() dto: UpdateCategoryDto, @getUser() user: User) {
        return this.categoryService.updateCategory(dto, user.type);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, AdminGuard)
    deleteCategory( params: IdDto, @getUser()  user: User) {
        return this.categoryService.deleteCategory(params, user.type);
    }
}