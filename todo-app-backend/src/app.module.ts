import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {UserModule} from "./user/user.module";
import {TodoModule} from "./todo/todo.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'your_username',
      password: 'your_password',
      database: 'todo_app',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
