import { IsString, IsNotEmpty, IsUrl, IsUUID} from 'class-validator';

export class updateBillboard {
    @IsUUID()
    @IsNotEmpty()
    id: string;
        
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;
}