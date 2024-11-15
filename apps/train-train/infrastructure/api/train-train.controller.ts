import { Body, Controller, Header, Post } from "@nestjs/common";
import { ApiOperation } from '@nestjs/swagger';
import { WebTicketManager } from '@train-train/domain';
import { ReservationDto } from "./dtos/reservation.dto";

@Controller('api/reservations')
export class ReservationsController {
    constructor(private readonly webTicketManager: WebTicketManager) {}

    // POST api/reservations
    @Post()
    @Header('Content-type', 'application/json')
    @ApiOperation({ operationId: 'reserveSeats' })
    async reserveSeats(@Body() reservationRequest: ReservationDto): Promise<string> {
        return this.webTicketManager.reserve(reservationRequest.trainId, reservationRequest.numberOfSeats);
    }
}