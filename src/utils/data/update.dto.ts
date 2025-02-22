import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class udpateDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    value?: string;
}