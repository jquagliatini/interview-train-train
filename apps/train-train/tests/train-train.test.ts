import { makeWebTicketManager } from "./train-train.test-utils";

describe("Train Train", () => {
  it("should reserve seats when they are not already reserved", async () => {
    const { webTicketManager, trainId, bookingReference } =
      makeWebTicketManager("with10AvailableSeats");

    const out = await webTicketManager.reserve(trainId, 3);

    expect(JSON.parse(out)).toEqual({
      train_id: trainId,
      booking_reference: bookingReference,
      seats: ["1A", "2A", "3A"],
    });
  });

  it("should not reserve seats when it exceeds max capacity threshold of 70%", async () => {
    const { webTicketManager, trainId } =
      makeWebTicketManager("with10SeatsAnd6AlreadyReserved");

    const out = await webTicketManager.reserve(trainId, 3);

    expect(JSON.parse(out)).toEqual({
      train_id: trainId,
      booking_reference: "",
      seats: [],
    });
  });

  it("should reserve all seats in the same coach", async () => {
    const { webTicketManager, trainId } =
      makeWebTicketManager("with2CoachesAnd9SeatsAlreadyReservedInTheFirstCoach");

    const out = await webTicketManager.reserve(trainId, 2);

    expect(JSON.parse(out)).toEqual({
      train_id: trainId,
      booking_reference: "",
      seats: ["1B", "2B"],
    });
  });
});
