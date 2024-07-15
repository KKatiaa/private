import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AwsModule } from './aws/aws.module';
import { PayrollModule } from './payroll/payroll.module';
import { User } from './user/user.entity';
import { Payroll } from './payroll/entities/payroll.entity';
import { Field } from './payroll/entities/field.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATA_SOURCE_HOST'),
        port: configService.get('DATA_SOURCE_PORT'),
        username: configService.get('DATA_SOURCE_USERNAME'),
        password: configService.get('DATA_SOURCE_PASSWORD'),
        database: configService.get('DATA_SOURCE_DATABASE'),
        synchronize: configService.get('DATA_SOURCE_SYNCHRONIZE') == 'true',
        entities: [User, Payroll, Field],
      }),
    }),
    AuthModule,
    UserModule,
    EmailModule,
    AwsModule,
    PayrollModule,
  ],
})
export class AppModule {}
