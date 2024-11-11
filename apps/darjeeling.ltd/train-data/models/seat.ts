export class Seat {
  coach: string;
  seatNumber: string;
  bookingReference: string;

  constructor(coach: string, seatNumber: string, bookingReference: string) {
    this.coach = coach;
    this.seatNumber = seatNumber;
    this.bookingReference = bookingReference;
  }

  equals(other: Seat): boolean {
    return (
      this === other ||
      (this.coach === other.coach &&
        this.seatNumber === other.seatNumber &&
        this.bookingReference === other.bookingReference)
    );
  }

  toString(): string {
    return `"${this.seatNumber}${this.coach}": {"booking_reference": "${this.bookingReference}", "seat_number": "${this.seatNumber}", "coach": "${this.coach}"}`;
  }
}
