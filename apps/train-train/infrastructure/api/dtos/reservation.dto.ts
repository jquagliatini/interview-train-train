import { IsString, IsInt } from 'class-validator'

export class ReservationDto {
    @IsString()
    trainId!: string;

    @IsInt()
    numberOfSeats!: number;
}