/**
 * @file show-tasks.component.ts
 * @author Claret Devige
 * @description Componente que renderiza las tareas.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.scss']
})
export class ShowTasksComponent {

  /**
   * @function tasksList
   * @description Recibe la lista de tareas a renderizar.
   */
  @Input() tasksList?: Task[];

  /**
   * @function completed
   * @description Recibe un booleano que utiliza para saber si el filtro "COMPLETED" está activo, para
   * renderizar las diferentes formas de borrado.
   */
  @Input() completed?: boolean;

  /**
   * @function updateTask
   * @description Emitter que permite actualizar el estado de las tareas.
   */
  @Output() updateTask = new EventEmitter<Task>()

  /**
   * @function deleteCompleted
   * @description Emitter que permite eliminar todas las tareas completas.
   */
  @Output() deleteCompleted = new EventEmitter()

  /**
   * @function deleteTask
   * @description Emitter que permite borrar una sola tarea.
   */
  @Output() deleteTask = new EventEmitter<string>()

  /**
   * @function handleCheck
   * @param task
   * @description cambia el valor booleano del estado "completed" da la tarea seleccionada a su opuesto
   * y envía la información al componente principal para actualizar la lista de tareas.
   */
  handleCheck(task: Task) {
    task.completed = !task.completed
    this.updateTask.emit(task)
  }

  /**
   * @function handleDelete
   * @description Permite ejecutar el emitter "deleteCompleted"
   */
  handleDelete() {
    this.deleteCompleted.emit()
  }

  /**
   * @function handleDeleteTask
   * @param title 
   * @description Recibe un string y lo envía a través del emitter deleteTask al componente principal
   * para que elimine la tarea.
   */
  handleDeleteTask(title: string) {
    this.deleteTask.emit(title)
  }
}
