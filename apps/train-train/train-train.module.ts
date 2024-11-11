import { Module } from "@nestjs/common";
import { ReservationsController } from "@train-train/infrastructure/api/train-train.controller";
import { HttpModule, HttpService } from "@nestjs/axios";
import { WebTicketManager } from "@train-train/domain/web-ticket.manager";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: WebTicketManager,
      inject: [HttpService],
      useFactory: (httpService: HttpService) =>
        WebTicketManager.withHttpService(httpService),
    },
  ],
  controllers: [ReservationsController],
})
export class TrainTrainModule {}
