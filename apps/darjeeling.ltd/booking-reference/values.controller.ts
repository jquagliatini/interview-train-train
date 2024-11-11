import { Controller, Get } from "@nestjs/common";

@Controller("booking_reference")
export class ValuesController {
    // GET api/values
    @Get()
    get(): string {
        return this.getNewBookingReference();
        //return ["value1", "value2"];
    }

    private static getRandomString(size: number): string {
        const random = () => Math.random().toString(32).slice(2);
        let s = '';
        while (s.length < size) {
            s += random();
        }
        return s.slice(0, size).toUpperCase();
    }

    private getNewBookingReference(): string {
        return ValuesController.getRandomString(6);
    }
}