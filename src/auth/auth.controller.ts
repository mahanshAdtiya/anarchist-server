import { Body, Controller, Post, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, LoginDto, GoogleAuthDto} from './data'

@Controller("auth")
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post("signup")
   async signup(@Body() dto: SignupDto) {
      return this.authService.signup(dto);
   }

   @Post("login")
   async login(@Body() dto: LoginDto) {
      return this.authService.login(dto);
   }

   @Post('googleAuth')
   async googleAuth(@Body() dto: GoogleAuthDto){
      return this.authService.googleAuth(dto)
   }
}
