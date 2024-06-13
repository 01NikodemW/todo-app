import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Length } from 'class-validator';
import { TASK_STATUS, TASK_STATUS_ARRAY } from './task-status.constants';

export class CreateTaskDto {
  @ApiProperty({ example: 'Title of the task' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(1, 255, {
    message: 'Title must be a string between 1 and 255 characters',
  })
  title: string;

  @ApiProperty({ example: 'Description of the task' })
  @IsNotEmpty({ message: 'Description is required' })
  @Length(1, 4000, {
    message: 'Description must be between 1 and 4000 characters',
  })
  description: string;

  @ApiProperty({ example: TASK_STATUS.TODO })
  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(TASK_STATUS_ARRAY, {
    message: `Status must be one of the following: ${TASK_STATUS_ARRAY.join(', ')}`,
  })
  status: string;
}
