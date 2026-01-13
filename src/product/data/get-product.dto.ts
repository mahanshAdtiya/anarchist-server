import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductsDto {
    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @IsString()
    colorId?: string;

    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : value?.split(',')))
    @IsArray()
    @IsString({ each: true })
    sizeIds?: string[];

    @IsOptional()
    @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : null))
    @IsBoolean()
    isFeatured?: boolean | null;

    @IsOptional()
    @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : null))
    @IsBoolean()
    isArchived?: boolean | null;
}
