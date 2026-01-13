import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID()
    @IsOptional()
    billboardId?: string;
}
