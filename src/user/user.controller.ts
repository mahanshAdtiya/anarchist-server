import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { getUser } from "src/auth/decorator";

import { JwtGuard } from "src/auth/guards";

@UseGuards(JwtGuard)
@Controller('users')
export class userController{
    @Get('whoAmI')
    getMew(@getUser() user: User){
        return user;
    }
}