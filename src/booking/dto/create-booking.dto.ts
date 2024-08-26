export class CreateBookingDto {
  id_user: string;
  id_client: string;
  id_service: string;
  date: Date;
  start_time: string;
  observation: string;
}
