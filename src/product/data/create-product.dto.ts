import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImageDto {
    @IsString()
    @IsNotEmpty()
    url: string;
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];
}
