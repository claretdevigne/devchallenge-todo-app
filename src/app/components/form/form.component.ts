/**
 * @file form.component.ts
 * @author Claret Devige
 * @description Componente que renderiza el formulario para agregar tareas.
 */
import { Component, EventEmitter, Output, Input } from '@angular/core';
import Task from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  /**
   * @var inputContent
   * @description Variable que define el placeholder y recibe el contenido que se agrega al input.
   */
  inputContent: string = "New task";

  /**
   * @function validateTitle
   * @description Función que recibe del componente principal un booleano que le permite renderizar un error
   * si el título de la tarea ya existe en la base de datos.
   */
  @Input() validateTitle?: boolean;

  /**
   * @function sendTask
   * @description Función que almacena una tarea para enviarse al componente principal.
   */
  @Output() sendTask = new EventEmitter<Task>()

  /**
   * @function handleInput
   * @description Función que crea la tarea y permite enviarla al componente principal para que sea
   * almacenada en la lista de tareas.
   */
  handleInput(){
    let newTask: Task = {
      title: this.inputContent,
      completed: false
    }

    this.sendTask.emit(newTask)
  }
}
