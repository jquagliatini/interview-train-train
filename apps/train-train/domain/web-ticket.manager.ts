import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { HttpTrainDataService } from "@train-train/infrastructure/services/http-train.data-service";
import { HttpBookingReferenceService } from "@train-train/infrastructure/services/http-booking-reference.service";
import { BookingReferenceService } from "@train-train/domain/booking-reference.service";
import { Seat } from "@train-train/domain/seat";
import { ThresholdManager } from "@train-train/domain/threshold.manager";
import { Train } from "@train-train/domain/train";
import { TrainDataService } from "@train-train/domain/train.data-service";

@Injectable()
export class WebTicketManager {
  private static readonly uriBookingReferenceService = new URL(
    "http://localhost:7264"
  );
  private static readonly uriTrainDataService = new URL(
    "http://localhost:7177"
  );

  constructor(
    private readonly trainDataService: TrainDataService,
    private readonly bookingReferenceService: BookingReferenceService
  ) {}

  static withHttpService(httpService: HttpService) {
    return new WebTicketManager(
      new HttpTrainDataService(
        httpService,
        WebTicketManager.uriTrainDataService
      ),
      new HttpBookingReferenceService(
        httpService,
        WebTicketManager.uriBookingReferenceService
      )
    );
  }

  async reserve(trainId: string, seatsRequestedCount: number): Promise<string> {
    const availableSeats: Seat[] = [];
    let count = 0;
    let result: object | null = null;
    let bookingRef: string | null = null;

    const jsonTrain = await this.trainDataService.getTrain(trainId);
    result = jsonTrain;

    let trainInst = Train.fromJson(jsonTrain);
    if (
      trainInst.reservedSeats + seatsRequestedCount <=
      Math.floor(ThresholdManager.getMaxRes() * trainInst.getMaxSeat())
    ) {
      let numberOfReserv = 0;
      let i = 0;
      for (let index = 0; index < trainInst.seats.length; index++) {
        const each = trainInst.seats[index];
        if (each.bookingRef === "") {
          i++;
          if (i <= seatsRequestedCount) {
            availableSeats.push(each);
          }
        }
      }

      for (const a of availableSeats) {
        count++;
      }

      let reservedSeats = 0;

      if (count !== seatsRequestedCount) {
        return `{ "train_id": "${trainId}", "booking_reference": "", "seats": [] }`;
      } else {
        bookingRef = await this.bookingReferenceService.getBookingReference();
        for (const availableSeat of availableSeats) {
          availableSeat.bookingRef = bookingRef;
          numberOfReserv++;
          reservedSeats++;
        }
      }

      if (numberOfReserv === seatsRequestedCount) {
        await this.trainDataService.reserve(
          trainId,
          bookingRef,
          availableSeats
        );
        const totod = "[TODO]";

        return `{ "train_id": "${trainId}", "booking_reference": "${bookingRef}", "seats": ${this.dumpSeats(
          availableSeats
        )} }`;
      }
    }

    return `{ "train_id": "${trainId}", "booking_reference": "", "seats": [] }`;
  }

  private dumpSeats(seats: Seat[]): string {
    let output = "[";
    let firstTime = true;
    for (const seat of seats) {
      if (!firstTime) output += ",";
      else firstTime = false;

      output += `"${seat.seatNumber}${seat.coachName}"`;
    }
    output += "]";
    return output;
  }
}
