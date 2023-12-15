import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../Interfaces/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  task = new FormControl<string>('', { nonNullable: true });

  tasks = signal<Task[]>([]);

  completedTasks = computed(() => {
    const completedTasks = this.tasks().filter((task) => task.isCompleted);
    return completedTasks;
  });

  uncompletedTasks = computed(() => {
    const completedTasks = this.tasks().filter((task) => !task.isCompleted);
    return completedTasks;
  });

  constructor() {
    effect(() => {
      if (this.uncompletedTasks().length > 5) {
        alert(`Tienes ${this.uncompletedTasks().length} Tareas No competadas!`);
      }
    });
  }

  addTask() {
    this.tasks.update((tasks) => [
      ...tasks,
      { name: this.task.value, isCompleted: false },
    ]);
    this.task.setValue('');
  }

  toggleCompletedTask(task: Task) {
    this.tasks.update(tasks => {
      const taskToUpdate = this.tasks().find(t => t.name === task.name);
      if (taskToUpdate) {
        taskToUpdate.isCompleted = !taskToUpdate?.isCompleted;
      }
      return tasks;
    })
  }

  deleteTask(task: Task) {
    this.tasks.update(tasks => {
      return tasks.filter((t) => t.name !== task.name)
    });
  }

  resetTask() {
    this.tasks.set([]);
  }

}
