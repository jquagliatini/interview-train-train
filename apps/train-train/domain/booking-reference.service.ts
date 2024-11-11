export interface BookingReferenceService {
    getBookingReference(): Promise<string>;
}