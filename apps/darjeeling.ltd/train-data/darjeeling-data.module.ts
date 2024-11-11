import { Module } from "@nestjs/common";
import { ReserveController } from "./controllers/reserve.controller";
import { TrainController } from "./controllers/train.controller";
import { PROVIDE_TRAIN_TOKEN } from "./models/provide-train.interface";
import { TrainRepository } from "./models/train-repository";

@Module({
  providers: [{ provide: PROVIDE_TRAIN_TOKEN, useClass: TrainRepository }],
  controllers: [ReserveController, TrainController],
})
export class DarjeelingTrainDataModule {}
