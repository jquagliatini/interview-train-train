import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator'

export class ReservationDto {
    @ApiProperty()
    @IsString()
    trainId!: string;
    
    @ApiProperty()
    @IsInt()
    numberOfSeats!: number;
}