import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
