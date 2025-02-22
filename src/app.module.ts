import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { LoggerMiddleware } from './utils/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, 
    PrismaModule, UserModule, CategoryModule, ProductsModule, ColorModule, SizeModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
