import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
require ('dotenv').config()

let db_url = process.env.DB_URL
@Module({
  imports: [UserModule, MongooseModule.forRoot(db_url)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
