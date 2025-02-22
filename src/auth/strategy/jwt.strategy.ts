import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from '../data'
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET') || "anarchist", 
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.id }
        });
    
        if (user) {
            const { createdAt, updatedAt, ...sanitizedUser } = user;
            return sanitizedUser;
        }
    
        const admin = await this.prisma.admin.findUnique({
            where: { id: payload.id }
        });
    
        if (admin) {
            const { createdAt, updatedAt, password, ...sanitizedAdmin } = admin;
            return sanitizedAdmin;
        }
    
        return null;
    }
}
 