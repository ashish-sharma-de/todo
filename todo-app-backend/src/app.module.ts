import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Make sure ConfigModule is imported
      useFactory: (configService: ConfigService) => {
        const dbUrl = new URL(configService.get<string>('DATABASE_URL'));
        return {
          type: 'postgres',
          host: dbUrl.hostname,
          port: parseInt(dbUrl.port, 10),
          username: dbUrl.username,
          password: dbUrl.password,
          database: dbUrl.pathname.slice(1), // Removes the leading '/'
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true, // Note: set to 'false' for production to avoid losing data
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
