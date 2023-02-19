import { TaskService } from './task.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { nullable: 'items' })
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Task {
    return this.taskService.createTasks(createTaskInput);
  }
}
