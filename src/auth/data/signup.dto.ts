import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string; 

    @IsString()
    @IsNotEmpty()
    phoneNumber: string; 

    @IsString()
    @IsNotEmpty()
    password: string; 
}
