import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Todo} from "./todo.entity";
import {TodosService} from "./todo.service";
import {TodosController} from "./todo.controller";
import {UserModule} from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), UserModule], // Register the User entity repository
    providers: [TodosService],
    controllers: [TodosController],
})
export class TodoModule {}
