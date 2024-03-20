import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

describe('TodosService', () => {
    let service: TodosService;
    let mockRepository: Partial<Repository<Todo>>;

    beforeEach(async () => {
        mockRepository = {
            save: jest.fn(),
            remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: getRepositoryToken(Todo),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('save', () => {
        it('should save a todo item', async () => {
            const todo = new Todo();
            todo.title = 'Test Todo';
            jest.spyOn(mockRepository, 'save').mockResolvedValue(todo);
            expect(await service.save(todo)).toEqual(todo);
            expect(mockRepository.save).toHaveBeenCalledWith(todo);
        });
    });

    describe('delete', () => {
        it('should delete a todo item', async () => {
            const todo = new Todo();
            todo.id = 1;
            jest.spyOn(mockRepository, 'remove').mockResolvedValue(undefined);
            await service.delete(todo);
            expect(mockRepository.remove).toHaveBeenCalledWith(todo);
        });
    });
});
