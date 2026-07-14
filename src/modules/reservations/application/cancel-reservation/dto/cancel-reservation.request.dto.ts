import {
  IsString,
  MaxLength,
} from 'class-validator';

export class CancelReservationRequestDto {
  @IsString()
  @MaxLength(500)
  motivoCancelacion!: string;
}