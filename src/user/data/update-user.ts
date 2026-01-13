import { IsString, IsOptional } from 'class-validator';

export class updateUser {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;
}