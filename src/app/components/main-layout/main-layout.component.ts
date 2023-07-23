import { Component, OnInit } from '@angular/core';
import { ConversationsService } from 'src/app/services/conversations.service';
import { Router } from '@angular/router';

interface Conversation {
  idConversacion: number;
  nombreDestinatario: string;
  horaUltimoMensaje: string;
  ultimoMensaje: string;
  imagenDestinatario: string;
  tipo: string;
  status: string;
  idGrupo: number;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  conversationList: Conversation[] = [];
  chats: boolean = true;
  teams: boolean = false;
  calls: boolean = false;
  more: boolean = false;

  constructor(
    private conversationService: ConversationsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const conversationList = await this.conversationService.getConversations();
    this.conversationList = conversationList;
  }

  navigateToConversation(conversationId: number) {
    this.router.navigate(['/chat', conversationId]);
  }

  navigateToGroup(conversationId: number) {
    this.router.navigate(['/chats', conversationId])
  }

  handleChange(mensaje: string) {
    if (mensaje === 'chat') {
      this.chats = true;
      this.teams = false;
      this.calls = false;
      this.more = false;
    }
    if (mensaje === 'teams') {
      this.chats = false;
      this.teams = true;
      this.calls = false;
      this.more = false;
    }
    if (mensaje === 'calls') {
      this.chats = false;
      this.teams = false;
      this.calls = true;
      this.more = false;
    }
    if (mensaje === 'more') {
      this.chats = false;
      this.teams = false;
      this.calls = false;
      this.more = true;
    }
  }
}
