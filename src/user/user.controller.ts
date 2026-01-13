import { User } from "@prisma/client";
import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";

import { getUser } from "src/auth/decorator";

import { AdminGuard, JwtGuard } from "src/auth/guards";
import { updateUser } from "./data";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller('users')
export class userController{
    constructor(private userService: UserService) {}

    @Get('whoAmI')
    getMew(@getUser() user: User){
        return user;
    }

    @Patch()
    @UseGuards(AdminGuard)
    updateBillboard(@Body() dto: updateUser, @getUser() user: User) {
        return this.userService.updateUser(dto, user);
    }
}