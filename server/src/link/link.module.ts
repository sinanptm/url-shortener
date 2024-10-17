import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './link.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule { }
