import { HttpService } from "@nestjs/axios";
import { Seat } from "@train-train/domain/seat";
import { TrainDataService } from "@train-train/domain/train.data-service";
import { firstValueFrom } from "rxjs";

export class HttpTrainDataService implements TrainDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly uriTrainDataService: URL
  ) {}

  async getTrain(trainId: string): Promise<object> {
    const { data } = await firstValueFrom(
      this.httpService.get<object>(
        new URL(
          `/api/data_for_train/${trainId}`,
          this.uriTrainDataService
        ).toString(),
        { headers: { accept: "application/json" } }
      )
    );

    return data;
  }

  async reserve(
    trainId: string,
    bookingRef: string,
    availableSeats: readonly Seat[]
  ): Promise<void> {
    await firstValueFrom(
      this.httpService.post(
        new URL(`/reserve`, this.uriTrainDataService).toString(),
        this.buildPostContent(trainId, bookingRef, availableSeats),
        { headers: { "content-type": "application/json; charset=utf-8" } }
      )
    );
  }

  private buildPostContent(
    trainId: string,
    bookingRef: string,
    availableSeats: readonly Seat[]
  ): string {
    return JSON.stringify({
      train_id: trainId,
      booking_reference: bookingRef,
      seats: availableSeats
        .map((s) => `${s.seatNumber}${s.coachName}`)
        .join(","),
    });
  }
}
