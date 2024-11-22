export interface Solicitud {
  id: number;
  propertyId: number;
  requesterEmail: string;
  requestDateTime: string; // LocalDateTime
  arrivalDate: string; // LocalDate
  departureDate: string; // LocalDate
  amountOfResidents: number;
  amount: number;
  rejected: boolean;
  canceled: boolean;
  paid: boolean;
  completed: boolean;
  approved: boolean;
  expired: boolean;
  bank: string;
  accountNumber: number;
}