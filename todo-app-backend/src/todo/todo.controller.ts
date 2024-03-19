import {Controller, Get, Request, Body, UseGuards, Post, Delete, Param} from '@nestjs/common';
import { TodosService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import {Todo} from "./todo.entity";
import {UserService} from "../user/user.service";

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService,
                private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Request() req) {
        let user = await this.userService.findUser(req.user.email);
        return user.todos
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async save(@Body() todo: Todo, @Request() req) {
        let user = await this.userService.findUser(req.user.email);
        todo.user = user
        todo.userId = user.id
        return this.todosService.save(todo)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req) {
        let user = await this.userService.findUser(req.user.email);
        console.log(user.todos)
        const todo = await user.todos.find(todo => todo.id === Number(id));
        console.log(todo)
        if(!todo) throw new Error('Todo not found')
        return this.todosService.delete(todo)
    }
}
