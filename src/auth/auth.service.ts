import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { ConfigService } from "@nestjs/config"; 
import { SignupDto, LoginDto, GoogleAuthDto } from "./data";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {
        this.googleClient = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID')); 
    }

    async signup(dto: SignupDto) {
        const { email, password, name, phoneNumber } = dto;
    
        let user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            throw new BadRequestException("Email is already registered.");
        }

        const hashedPassword = await argon2.hash(password);
        
        user = await this.prisma.user.create({
            data: {
                email,
                name,
                phoneNumber,
                authentications: {
                    create: {
                        credential: hashedPassword, 
                    },
                },
            },
        });

        return this.generateAuthResponse(user, "Signup successful.", "USER");
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;
    
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { authentications: true },
        });

        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });

        if (!user && !admin) {
            throw new UnauthorizedException("Invalid credentials.");
        }

        if (user) {
            const authRecord = user.authentications[0];
            if (!authRecord || !authRecord.credential) {
                throw new UnauthorizedException("Account is linked to Google. Use Google Login.");
            }

            const isPasswordValid = await argon2.verify(authRecord.credential, password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid credentials.");
            }

            return this.generateAuthResponse(user, "Login successful.", "USER");
        }

        if (admin) {
            const isPasswordValid = await argon2.verify(admin.password, password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid credentials.");
            }

            return this.generateAuthResponse(admin, "Admin login successful.", "ADMIN");
        }
    }

    async googleAuth(dto: GoogleAuthDto) {
        const { oauthToken } = dto;
    
        const googleUser = await this.verifyGoogleToken(oauthToken);
        const email = googleUser?.email;
    
        if (!email) {
            throw new UnauthorizedException("Invalid Google authentication.");
        }

        let user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            return this.generateAuthResponse(user, "Google login successful.", "USER");
        }

        const hashedGoogleSub = await argon2.hash(googleUser.sub); 
        
        user = await this.prisma.user.create({
            data: {
                email,
                name: googleUser.name || "Unknown",
                authentications: {
                    create: {
                        credential: hashedGoogleSub, 
                    },
                },
            },
        });

        return this.generateAuthResponse(user, "Google account linked and user created successfully.", "USER");
    }

    private async verifyGoogleToken(token: string) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: this.configService.get<string>('GOOGLE_CLIENT_ID'), 
            });
            return ticket.getPayload();
        } catch (error) {
            throw new UnauthorizedException("Invalid Google authentication.");
        }
    }

    private async generateAuthResponse(user: any, message: string, role: "USER" | "ADMIN"): Promise<{ msg: string, user: { id: string, name: string, email: string, role: string }, access_token: string }> {
        const payload = { id: user.id, email: user.email, role };
        const token = await this.jwtService.signAsync(payload);
        return {
            msg: message,
            user: { id: user.id, name: user.name, email: user.email, role },
            access_token: token,
        };
    }
}