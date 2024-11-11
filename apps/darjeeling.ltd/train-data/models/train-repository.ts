import { Injectable } from "@nestjs/common";
import { ProvideTrainInterface } from "@djld-train/models/provide-train.interface";
import { Train } from "./train";
import { TrainUpdateDto } from "./train-update.dto";
import { Seat } from "./seat";

@Injectable()
export class TrainRepository implements ProvideTrainInterface {
    private readonly trains = new Map<string, Train>();

    async getTrain(trainId: string): Promise<Train> {
        if (!this.trains.has(trainId)) {
            const train = new Train(trainId);
            for (const c of 'ABCDEFGHIJKL') {
                const coach = new Coach(c);
                for (let i = 1; i < 42; i++) {
                    const seat = new Seat(coach.name, i.toString(), '');
                    coach.seats.push(seat);
                }
                train.add(coach);
            }
            this.trains.set(trainId, train);
        }

        return this.trains.get(trainId) as Train;
    }

    async updateTrainReservation(trainUpdateDto: TrainUpdateDto): Promise<void> {
        if (trainUpdateDto.train_id === '' || trainUpdateDto.train_id == null) {
            throw new Error(`Must have a non-null or non-empty train_id`);
        }

        var train = await this.getTrain(trainUpdateDto.train_id);
        const seats: Seat[] = [];
        for (const seatInString of trainUpdateDto.seats) {
            // BUGFIX: 25/04/17
            const seatNumber = Array.from(seatInString).filter(c => /\d/.test(c)).join('');
            const coach = Array.from(seatInString).filter(c => /\w/.test(c)).join('');
            // END OF BUGFIX: 25/04/17
            const s = new Seat(coach, seatNumber, trainUpdateDto.booking_reference);
            seats.push(s);
        }

        train.reserve(seats, trainUpdateDto.booking_reference);
    } 

}

export class Coach {
    public seats: Seat[] = [];
    constructor(public name: string) {}

    upsertSeat(seat: Seat) {
        const index = this.seats.findIndex(s => s.equals(seat));
        if (index !== -1) this.seats.splice(index, 1);
        this.seats.push(seat);
    }
}