import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css'],
})
export class MainFooterComponent {
  @Input() chats: boolean = true;
  @Input() teams: boolean = false;
  @Input() calls: boolean = false;
  @Input() more: boolean = false;

  @Output() changeView = new EventEmitter<any>();
  constructor() {}

  emitChangeView(evento: string) {
    this.changeView.emit(evento);
  }
}
