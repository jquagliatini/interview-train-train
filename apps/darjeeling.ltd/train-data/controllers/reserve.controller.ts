import {
  PROVIDE_TRAIN_TOKEN,
  ProvideTrainInterface,
} from "@djld-train/models/provide-train.interface";
import { TrainUpdateDto } from "@djld-train/models/train-update.dto";
import { Body, Controller, Inject, Post } from "@nestjs/common";

@Controller("reserve")
export class ReserveController {
  // POST on
  // http://localhost:50680/api/reserve
  // with JSON payload:
  //  {
  //      "train_id": "5FSdR",
  //      "seats": ["4A", "5A"],
  //      "booking_reference": "Td98kms"
  //  }
  //
  private trainProvider: ProvideTrainInterface;
  constructor(
    @Inject(PROVIDE_TRAIN_TOKEN)
    trainProvider: ProvideTrainInterface
  ) {
    this.trainProvider = trainProvider;
  }

  // POST api/data_for_train
  @Post()
  reserve(@Body() value: TrainUpdateDto): Promise<void> {
    return this.trainProvider.updateTrainReservation(value);
  }
}
