import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './utils/jwt.strategy';
import { MailService } from '../common/services/mail.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('jwt') as JwtModuleOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, MailService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
