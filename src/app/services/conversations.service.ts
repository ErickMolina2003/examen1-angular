import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  constructor() {}

  async getConversations() {
    let userId = JSON.parse(window.localStorage.getItem('team-user') ?? '');
    userId = userId.id;
    try {
      const response = await fetch(
        `http://localhost:3000/usuarios/${userId}/conversaciones`,
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
            return user.id === conversation.idDestinatario;
          });
        });
        data.forEach((conversation: any) => {
          filteredData.forEach((user: any) => {
            if (user.id === conversation.idDestinatario) {
              conversation.status = user.status;
            }
          });
        });
        return data;
      } else {
        window.alert('No se pudo conseguir la lista de conversaciones');
      }
    } catch (error) {
      window.alert('No se pudo conseguir la lista de conversaciones');
      throw error;
    }
  }
}
