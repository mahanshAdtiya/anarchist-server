import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class ImageDto {
    @IsString()
    url: string;
}

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string; 

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    @IsOptional()
    images?: ImageDto[];

    @IsString()
    @IsOptional()
    sizeId?: string;

    @IsString()
    @IsOptional()
    colorId?: string;
}
