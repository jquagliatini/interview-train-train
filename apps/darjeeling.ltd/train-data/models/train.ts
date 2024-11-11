import { Seat } from "@djld-train/models/seat";
import { Coach } from "./train-repository";

export class Train {
  get seats(): Seat[] {
    const out: Seat[] = [];
    for (const coach of this.coaches.values()) {
      out.push(...coach.seats);
    }
    return out;
  }

  constructor(private readonly trainId: string) {}

  coaches = new Map<string, Coach>();
  toString(): string {
    let json = '{"seats": {';
    let firstElement = true;
    for (const seat of this.seats) {
      if (!firstElement) json += ",";
      else firstElement = false;

      json += seat.toString();
    }
    return json + "}}";
  }

  add(coach: Coach): void {
    this.coaches.set(coach.name, coach);
  }

  reserve(seats: Seat[], bookingReference: string): void {
    for (const seat of seats) {
      const coach = this.coaches.get(seat.coach);
      if (coach) {
        coach.upsertSeat(seat);
      }
    }
  }
}
