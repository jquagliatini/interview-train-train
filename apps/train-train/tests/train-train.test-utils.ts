import { faker } from "@faker-js/faker";
import { BookingReferenceService } from "@train-train/domain/booking-reference.service";
import { TrainDataService } from "@train-train/domain/train.data-service";
import { WebTicketManager } from "@train-train/domain/web-ticket.manager";
import { mock } from "jest-mock-extended";

export function makeWebTicketManager(topology: keyof typeof TOPOLOGIES) {
  const trainId = fakeTrainId();
  const bookingReference = fakeBookingReference();
  const trainDataService = mock<TrainDataService>();
  trainDataService.getTrain
    .calledWith(trainId)
    .mockResolvedValue(TOPOLOGIES[topology]);

  const bookingRefService = mock<BookingReferenceService>();
  bookingRefService.getBookingReference.mockResolvedValue(bookingReference);

  const webTicketManager = new WebTicketManager(
    trainDataService,
    bookingRefService
  );

  return { webTicketManager, trainId, bookingReference };
}

function fakeBookingReference(): string {
  return faker.helpers.replaceSymbols("##???##").toLowerCase();
}

function fakeTrainId(): string {
  return faker.helpers.fromRegExp(/[0-9][a-z]{2}[A-Z]{2}-[0-9]{3}/);
}

type Topology = {
  seats: Record<
    string,
    { booking_reference: string; seat_number: string; coach: string }
  >;
};
const TOPOLOGIES = {
  [`with10AvailableSeats`]: {
    seats: {
      "1A": { booking_reference: "", seat_number: "1", coach: "A" },
      "2A": { booking_reference: "", seat_number: "2", coach: "A" },
      "3A": { booking_reference: "", seat_number: "3", coach: "A" },
      "4A": { booking_reference: "", seat_number: "4", coach: "A" },
      "5A": { booking_reference: "", seat_number: "5", coach: "A" },
      "6A": { booking_reference: "", seat_number: "6", coach: "A" },
      "7A": { booking_reference: "", seat_number: "7", coach: "A" },
      "8A": { booking_reference: "", seat_number: "8", coach: "A" },
      "9A": { booking_reference: "", seat_number: "9", coach: "A" },
      "10A": { booking_reference: "", seat_number: "10", coach: "A" },
    },
  } satisfies Topology,
  [`with10SeatsAnd6AlreadyReserved`]: {
    seats: {
      "1A": { booking_reference: "75bcd16", seat_number: "1", coach: "A" },
      "2A": { booking_reference: "75bcd16", seat_number: "2", coach: "A" },
      "3A": { booking_reference: "75bcd16", seat_number: "3", coach: "A" },
      "4A": { booking_reference: "75bcd16", seat_number: "4", coach: "A" },
      "5A": { booking_reference: "75bcd16", seat_number: "5", coach: "A" },
      "6A": { booking_reference: "75bcd16", seat_number: "6", coach: "A" },
      "7A": { booking_reference: "", seat_number: "7", coach: "A" },
      "8A": { booking_reference: "", seat_number: "8", coach: "A" },
      "9A": { booking_reference: "", seat_number: "9", coach: "A" },
      "10A": { booking_reference: "", seat_number: "10", coach: "A" },
    },
  } satisfies Topology,
  [`with2CoachesAnd9SeatsAlreadyReservedInTheFirstCoach`]: {
    seats: {
      "1A": { booking_reference: "75bcd16", seat_number: "1", coach: "A" },
      "2A": { booking_reference: "75bcd16", seat_number: "2", coach: "A" },
      "3A": { booking_reference: "75bcd16", seat_number: "3", coach: "A" },
      "4A": { booking_reference: "75bcd16", seat_number: "4", coach: "A" },
      "5A": { booking_reference: "75bcd16", seat_number: "5", coach: "A" },
      "6A": { booking_reference: "75bcd16", seat_number: "6", coach: "A" },
      "7A": { booking_reference: "75bcd16", seat_number: "7", coach: "A" },
      "8A": { booking_reference: "75bcd16", seat_number: "8", coach: "A" },
      "9A": { booking_reference: "75bcd16", seat_number: "9", coach: "A" },
      "10A": { booking_reference: "", seat_number: "10", coach: "A" },

      "1B": { booking_reference: "", seat_number: "1", coach: "B" },
      "2B": { booking_reference: "", seat_number: "2", coach: "B" },
      "3B": { booking_reference: "", seat_number: "3", coach: "B" },
      "4B": { booking_reference: "", seat_number: "4", coach: "B" },
      "5B": { booking_reference: "", seat_number: "5", coach: "B" },
      "6B": { booking_reference: "", seat_number: "6", coach: "B" },
      "7B": { booking_reference: "", seat_number: "7", coach: "B" },
      "8B": { booking_reference: "", seat_number: "8", coach: "B" },
      "9B": { booking_reference: "", seat_number: "9", coach: "B" },
      "10B": { booking_reference: "", seat_number: "10", coach: "B" },
    },
  } satisfies Topology,
};
