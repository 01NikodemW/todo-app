import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async update(id: number, task: Partial<Task>): Promise<void> {
    const existingTask = await this.tasksRepository.findOneBy({ id });
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.tasksRepository.update(id, task);
  }

  async remove(id: number): Promise<void> {
    const existingTask = await this.tasksRepository.findOneBy({ id });
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.tasksRepository.delete(id);
  }
}
