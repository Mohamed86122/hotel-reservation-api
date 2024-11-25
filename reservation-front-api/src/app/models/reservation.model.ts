export interface Reservation {
  reservationId?: number; 
  roomId: string;
  nomComplet: string;
  mail: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  isPaid?: boolean; 
  isCancelled?: boolean; // Défini par défaut à `false`
  dateCreated?: Date; // Généré automatiquement par le backend
}
