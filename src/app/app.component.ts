/**
 * @file app.component.ts
 * @author Claret Devige
 * @description Componente principal de la aplicación que se encarga de renderizar el resto de los
 * componentes.
 */

import { Component, OnInit } from '@angular/core';

/**
 * Importa la interface Task para definir las tareas.
 */
import Task from './interfaces/task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * @class AppComponent
 * @description Componente principal que renderiza a los demás componentes.
 */
export class AppComponent implements OnInit {

  /**
   * @var errorAddingTask
   * @description Booleano que controla un mensaje de error al ingresar una tarea con nombre identico a
   * una ya existente.
   */
  errorAddingTask: boolean = false

  /**
   * @var completed
   * @description Booleano que permite renderizarse al boton de "Delete All" cuando está activo.
   */
  completed: boolean = false

  /**
   * @var taskListDB
   * @description Almacena la lista de tareas completa.
   */
  taskListDB: Task[] = []
  
  /**
   * @var tasksList
   * @description Almacena la lista de tareas que se renderiza al aplicarle los filtros que permiten
   * definir qué tareas se visualizar.
   */
  tasksList: Task[] = []

  /**
   * @var activeOption
   * @description Permite activar el indicador visual que se encuentra bajo los botones "ALL", "ACTIVE"
   * y "COMPLETED"
   */
  activeOption: string = 'ALL'

  /**
   * @function ngOnInit
   * @description Gestiona el ciclo de vida. Antes de renderizar el componente verifica si existe la 
   * lista de tareas guardada en el localStorage, si es así las carga en la variable "taskListDB" y 
   * aplica el filtro "ALL"
   */
  ngOnInit() {
    if (localStorage.getItem('taskListDB')){
      let tmp = JSON.stringify(localStorage.getItem('taskListDB'))
      let taskListTmp = JSON.parse(JSON.parse(tmp))
      
      this.taskListDB = taskListTmp
      
    }

    this.applyFilter('ALL')
  }

  /**
   * @function applyFilter
   * @param filter 
   * @description Recibe un string y en base a este utiliza un switch para almacenar en la variable
   * taskList, las tareas a renderizarse.
   */
  applyFilter(filter: string) {
    switch (filter) {
      case "ALL":
        this.tasksList = this.taskListDB
        this.activeOption = "ALL"
        this.completed = false
        break;

      case "ACTIVE":
        this.tasksList = this.taskListDB.filter(i => i.completed === false)
        this.activeOption = "ACTIVE"
        this.completed = false
        break;

      case "COMPLETED":
        this.tasksList = this.taskListDB.filter(i => i.completed === true)
        this.activeOption = "COMPLETED"
        this.completed = true
        break;
    
      default:
        break;
    }
  }

  /**
   * @function handleSendTask
   * @param newTask 
   * @description Permite agregar una nueva tarea a la "taskListDB".
   */
  handleSendTask(newTask: Task) {
    // Resetea el errorAddingTask a false, en caso de que antes se haya reasignado a true
    this.errorAddingTask = false

    // Booleano para verificar que no se repitan los nombres de las tareas ya que se utilizan como ID.
    let validate: boolean = true

    // Map que realiza la verificación, en caso de encontrar que el nombre de una tarea se repite
    // reasigna la variable anterior a true
    this.taskListDB.map(i => {
      if (i.title === newTask.title) {
        validate = false
      }
    })

    // Verifica la variable "validate". Si es true añade la tarea a la taskListDB y lo guarda además
    // en el localStorage
    if (validate) {
      this.taskListDB.push(newTask)
      localStorage.setItem('taskListDB', JSON.stringify(this.taskListDB))
      // si "validate" es false muestra el error en el DOM.
    } else {
      this.errorAddingTask = true
    }
  }

  /**
   * @function handleUpdateTask
   * @param newTask 
   * @description Verifica que la tarea exista usando el titulo y si existe modifica la propiedad
   * completed que hace referencia a si la propiedad ha sido completada o no.
   */
  handleUpdateTask(newTask: Task) {
    this.taskListDB.map(i => {
      if (i.title === newTask.title) {
        i = newTask
        localStorage.setItem('taskListDB', JSON.stringify(this.taskListDB))
      }
    })
  }

  /**
   * @function handleDeleteCompleted
   * @description Borra todas las tareas.
   */
  handleDeleteCompleted() {
    this.taskListDB = this.taskListDB.filter(task => task.completed === false)
    this.tasksList = this.taskListDB
    localStorage.setItem('taskListDB', JSON.stringify(this.taskListDB))
  }

  /**
   * @function handleDeleteTask
   * @param title
   * @description verifica si una tarea existe usando el título y en ese caso la elimina.
   */
  handleDeleteTask(title: string) {
    this.taskListDB = this.taskListDB.filter(i => i.title !== title)
    this.tasksList = this.taskListDB
    localStorage.setItem('taskListDB', JSON.stringify(this.taskListDB))
  }

}
