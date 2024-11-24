import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor() {
    // Simuler un utilisateur connecté
    this.userId = 'user123'; // Remplacez par une logique réelle
  }

  getUserId(): string | null {
    return this.userId;
  }
  isAdmin(): boolean 
  {
    return this.userId === 'admin';
  }

  logout(): void {
    this.userId = null;
  }
}
