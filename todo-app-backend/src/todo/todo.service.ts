import { Injectable} from '@nestjs/common';
import {Todo} from "./todo.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TodosService {
    constructor( @InjectRepository(Todo)private todosRepository: Repository<Todo>) {}

    async save(todo: Todo) {
        return await this.todosRepository.save(todo);
    }

    async delete(todo: Todo): Promise<void> {
        await this.todosRepository.remove(todo);
    }
}
