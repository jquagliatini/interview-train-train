import { ReservationDto } from "@train-train/infrastructure/api/dtos/reservation.dto";
import { Seat } from "./seat";

export class Train {
  private constructor(
    readonly seats: readonly Seat[],
    readonly reservedSeats: number
  ) {}

  getMaxSeat(): number {
    return this.seats.length;
  }

  hasLessThanThreshold(i: number): boolean {
    return this.reservedSeats < i;
  }

  /** @example "{"seats": {"1A": {"booking_reference": "", "seat_number": "1", "coach": "A"}, "2A": {"booking_reference": "", "seat_number": "2", "coach": "A"}}}"; */
  static fromJson(jsonTopology: object) {
    const seats: Seat[] = [];
    let reservedSeats = 0;

    const topologyItems = Object.values(jsonTopology);
    for (const seat of topologyItems) {
      if (
        typeof seat === "object" &&
        seat !== null &&
        "booking_reference" in seat &&
        "seat_number" in seat &&
        "coach" in seat
      ) {
        seats.push(
          Seat.from({
            coachName: String(seat.coach ?? ""),
            bookingRef: String(seat.booking_reference ?? ""),
            seatNumber: Number(seat.seat_number),
          })
        );

        if (String(seat.booking_reference).trim() !== "") {
          reservedSeats++;
        }
      }
    }

    return new Train(seats, reservedSeats);
  }
}
