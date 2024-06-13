import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Title of the task' })
  title: string;

  @ApiProperty({ example: 'Description of the task' })
  description: string;

  @ApiProperty({ example: 'todo' })
  status: string;
}
