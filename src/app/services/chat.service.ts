import { Injectable } from '@angular/core';
import { ConversationsService } from './conversations.service';

interface Conversation {
  idConversacion: number;
  nombreDestinatario: string;
  horaUltimoMensaje: string;
  ultimoMensaje: string;
  imagenDestinatario: string;
  tipo: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatId: number = -1;
  constructor(private conversationService: ConversationsService) {}

  async getChat(chatId: number) {
    this.chatId = chatId;

    try {
      const response = await fetch(
        `http://localhost:3000/conversaciones/${this.chatId}/mensajes`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        const response2 = await fetch(`http://localhost:3000/usuarios`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const data2 = await response2.json();
        const filteredData = data2.filter((user: any) => {
          return data.some((conversation: any) => {
            return user.id === conversation.emisor;
          });
        });
        data.forEach((conversation: any) => {
          filteredData.forEach((user: any) => {
            if (user.id === conversation.emisor) {
              conversation.status = user.status;
              conversation.imagen = user.imagen;
              conversation.nombreEmisor = user?.nombre;
            }
          });
        });
        return data;
      } else {
        window.alert('No se pudo cargar el chat');
      }
    } catch (error) {
      window.alert('No se pudo cargar el chat');
      throw error;
    }
  }

  async getGroup(chatId: number) {
    this.chatId = chatId;

    try {
      const response = await fetch(
        `http://localhost:3000/grupos/${this.chatId}/mensajes`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        const response2 = await fetch(`http://localhost:3000/usuarios`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data3: Conversation[] =
          await this.conversationService.getConversations();
        const data = await response.json();
        const data2 = await response2.json();
        const filteredData = data2.filter((user: any) => {
          return data.some((conversation: any) => {
            return user.id === conversation.emisor.id;
          });
        });
        data.forEach((conversation: any) => {
          filteredData.forEach((user: any) => {
            if (user.id === conversation.emisor.id) {
              conversation.emisor.status = user.status;
            }
          });
        });
        data3.forEach((conversation: any) => {
          data.forEach((item: any) => {
            if (conversation.idGrupo == chatId) {
              item.nombre = conversation.nombreDestinatario;
            }
          });
        });
        return data;
      } else {
        window.alert('No se pudo cargar el chat grupal.');
      }
    } catch (error) {
      window.alert('No se pudo cargar el chat grupal.');
      throw error;
    }
  }

  async sendMessage(
    chatId: number,
    emisorId: number,
    receptorId: number,
    mensaje: string,
    hora: string
  ) {
    try {
      const response = await fetch('http://localhost:3000/mensajes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idConversacion: chatId,
          emisor: emisorId,
          receptor: receptorId,
          mensaje: mensaje,
          hora: hora,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return undefined;
        window.alert('No se pudo mandar el mensaje');
      }
    } catch (error) {
      window.alert('No se pudo mandar el mensaje');
      throw error;
    }
  }

  async sendMessageGroup(
    chatId: number,
    emisorId: number,
    receptorId = null,
    mensaje: string,
    hora: string
  ) {
    try {
      const response = await fetch('http://localhost:3000/mensajes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idGrupo: chatId,
          emisor: emisorId,
          receptor: receptorId,
          mensaje: mensaje,
          hora: hora,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return undefined;
        window.alert('No se pudo mandar el mensaje');
      }
    } catch (error) {
      window.alert('No se pudo mandar el mensaje');
      throw error;
    }
  }
}
