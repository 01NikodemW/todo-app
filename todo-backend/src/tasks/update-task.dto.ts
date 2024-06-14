import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, Length } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { TASK_STATUS_ARRAY } from './task-status.constants';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'Title of the task', required: false })
  @Length(1, 255, {
    message: 'Title must be a string between 1 and 255 characters',
  })
  title?: string;

  @ApiProperty({ example: 'Description of the task', required: false })
  @Length(1, 4000, {
    message: 'Description must be a string between 1 and 4000 characters',
  })
  description?: string;

  @ApiProperty({ example: 'todo', required: false })
  @IsIn(TASK_STATUS_ARRAY, {
    message: `Status must be one of the following: ${TASK_STATUS_ARRAY.join(', ')}`,
  })
  status?: string;
}
