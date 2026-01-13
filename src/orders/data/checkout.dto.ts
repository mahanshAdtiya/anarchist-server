import { 
    IsArray, 
    IsNotEmpty, 
    IsUUID, 
    IsEmail, 
    IsString, 
    ValidateNested, 
    IsObject 
} from 'class-validator';
import { Type } from 'class-transformer';

class CheckoutItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsUUID()
    @IsNotEmpty()
    sizeId: string;
}

class AddressDto {
    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @IsString()
    @IsNotEmpty()
    addressLine: string;
}


export class CheckoutDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    @IsNotEmpty()
    items: CheckoutItemDto[];

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @ValidateNested()
    @Type(() => AddressDto)
    @IsNotEmpty()
    shippingAddress: AddressDto;

    @ValidateNested()
    @Type(() => AddressDto)
    @IsNotEmpty()
    billingAddress: AddressDto;
}
