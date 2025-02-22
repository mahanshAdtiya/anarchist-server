import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
