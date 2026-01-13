import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateBillboard {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;
}