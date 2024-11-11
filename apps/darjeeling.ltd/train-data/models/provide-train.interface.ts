import { Train } from "@djld-train/models/train";
import { TrainUpdateDto } from "@djld-train/models/train-update.dto";

export interface ProvideTrainInterface {
    getTrain(trainId: string): Promise<Train>;
    updateTrainReservation(trainUpdateDto: TrainUpdateDto): Promise<void>;
}

export const PROVIDE_TRAIN_TOKEN = Symbol();