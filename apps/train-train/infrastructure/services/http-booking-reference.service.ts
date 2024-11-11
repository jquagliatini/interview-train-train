import { HttpService } from "@nestjs/axios";
import { BookingReferenceService } from "@train-train/domain/booking-reference.service";
import { lastValueFrom } from "rxjs";

export class HttpBookingReferenceService implements BookingReferenceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly uriBookingReferenceService: URL
  ) {}

  async getBookingReference(): Promise<string> {
    const { data } = await lastValueFrom(this.httpService.request<string>(this.buildBookRefRequest()));
    return data;
  }

  private buildBookRefRequest() {
    return {
      method: "get",
      url: new URL(`/booking_reference`, this.uriBookingReferenceService).toString(),
      headers: { accept: "application/json" },
    };
  }
}
