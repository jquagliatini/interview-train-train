export class Seat {
    private constructor(
        public coachName: string,
        public seatNumber: number,
        public bookingRef: string,       
    ) {}

    static from(props: { coachName: string; seatNumber: number; bookingRef?: string }) {
        return new Seat(props.coachName, props.seatNumber, props.bookingRef ?? '');
    }
}
