import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

interface Conversation {
  emisor: number;
  hora: string;
  mensaje: string;
  receptor: number;
  status: string;
  imagen: string;
  nombreEmisor: string;
  nombre: string;
}

interface Conversations {
  emisor: Person;
  hora: string;
  mensaje: string;
  receptor: number;
  status: string;
  imagen: string;
  nombreEmisor: string;
  nombre: string;
}

interface Person {
  id: number;
  imagen: string;
  nombre: string;
  status: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  conversation: Conversation[] = [];
  conversations: Conversations[] = [];
  ownUserId: number = JSON.parse(window.localStorage.getItem('team-user') ?? '')
    .id;

  chatIndividual = false;
  nombreEmisor = '';
  imagenEmisor? = '';
  chatGrupal = false;

  mensaje = '';
  chatId: number = -1;

  constructor(
    private _route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getConversations();
  }

  navigateBack() {
    history.back();
  }

  onSubmit() {
    if (this.chatIndividual) {
      let receptorId = -1;
      this.conversation.forEach((conversation: Conversation) => {
        if (conversation.emisor != this.ownUserId) {
          receptorId = conversation.emisor;
        }
      });
      if (receptorId) {
        this.chatService.sendMessage(
          Number(this.chatId),
          this.ownUserId,
          receptorId,
          this.mensaje,
          '4:41pm'
        );
        this.mensaje = '';
        this.getConversations();
      }
    }

    if (this.chatGrupal) {
      this.chatService.sendMessageGroup(
        Number(this.chatId),
        this.ownUserId,
        null,
        this.mensaje,
        '4:41pm'
      );
      this.mensaje = '';

      this.getConversations();
    }
  }

  async getConversations() {
    let chatId: number = -1;
    const currentRoute = this._route.snapshot.url[0].path;
    this._route.params.subscribe((param: any) => {
      chatId = param['id'];
      this.chatId = param['id'];
    });
    if (currentRoute === 'chat') {
      this.chatIndividual = true;
      this.conversation = await this.chatService.getChat(chatId);
      this.conversation.forEach((user) => {
        if (user.emisor !== this.ownUserId) {
          this.nombreEmisor = user.nombreEmisor;
          this.imagenEmisor = user.imagen ?? null;
        }
      });
    }
    if (currentRoute === 'chats') {
      this.chatGrupal = true;
      this.conversations = await this.chatService.getGroup(chatId);
      this.nombreEmisor = this.conversations[0].nombre;
    }
  }
}
