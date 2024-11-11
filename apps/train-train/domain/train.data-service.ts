import { Seat } from "./seat";

export interface TrainDataService {
  getTrain(trainId: string): Promise<object>;
  reserve(
    trainId: string,
    bookingRef: string,
    availableSeats: readonly Seat[]
  ): Promise<void>;
}

export const TRAIN_DATA_SERVICE = Symbol();
