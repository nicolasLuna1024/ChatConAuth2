import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  messages: Message[] = [];
  newMessage = '';
  userName = '';

  constructor(private chatService: ChatService, private authService: AuthService) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    this.userName = user?.email || 'Invitado';

    this.chatService.getMessages().subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.newMessage, this.userName);
      this.newMessage = '';
    }
  }
}