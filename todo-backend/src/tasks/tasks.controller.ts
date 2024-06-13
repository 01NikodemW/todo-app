import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'Return a single task.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = {
      ...createTaskDto,
      id: null,
      createdAt: new Date(),
    };
    return this.tasksService.create(task);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>): Promise<void> {
    return this.tasksService.update(+id, task);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
