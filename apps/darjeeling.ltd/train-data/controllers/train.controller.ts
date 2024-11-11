import { PROVIDE_TRAIN_TOKEN, ProvideTrainInterface } from './../models/provide-train.interface';
import { Controller, Get, Header, Inject, Param } from "@nestjs/common";

@Controller("api/data_for_train")
export class TrainController {
    constructor(@Inject(PROVIDE_TRAIN_TOKEN) private trainProvider: ProvideTrainInterface) {}

    // GET api/data_for_train/5FSdR
    @Get(":trainId")
    @Header('Content-type', 'application/json')
    async getTrainData(@Param('trainId') trainId: string): Promise<string> {
        return (await this.trainProvider.getTrain(trainId)).toString();
    }
}