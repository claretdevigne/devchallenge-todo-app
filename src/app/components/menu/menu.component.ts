/**
 * @file menu.component.ts
 * @author Claret Devige
 * @description Componente que renderiza el menú superior en la aplicación que permite ver las tareas
 * dependiendo de si han sido completadas o no.
 */
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  /**
   * @var filter
   * @description Envía un string al componente principal que le permite gestionar que filtro usar ("ALL",
   * "ACTIVE" o "COMPLETED")
   */
  @Output() filter = new EventEmitter<string>()

  /**
   * @var activeOption
   * @description Recibe un string desde el componente principal que utiliza para renderizar un elemento
   * visual que identifica cuál opción y filtro se está aplicando.
   */
  @Input() activeOption?: string;

  /**
   * @function applyFilter
   * @param filter
   * @description Función que permite enviar el "filter" al componente principal.
   */
  applyFilter(filter: string) {
    this.filter.emit(filter)
  }
}
