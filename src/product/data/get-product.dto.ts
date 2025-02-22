import { IsString, IsOptional } from 'class-validator';

export class GetProductsDto {
    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    @IsOptional()
    sizeId?: string;

    @IsString()
    @IsOptional()
    colorId?: string;
}
