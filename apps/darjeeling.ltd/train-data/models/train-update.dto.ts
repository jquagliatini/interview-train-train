import { IsArray, IsString } from "class-validator";
import { Expose } from 'class-transformer'
import { ApiProperty } from "@nestjs/swagger";

export class TrainUpdateDto {
    @ApiProperty()
    @IsString()
    train_id!: string;

    @ApiProperty({ type: String, isArray: true })
    @IsArray()
    @IsString({ each: true })
    seats!: string[];

    @ApiProperty()
    @IsString()
    booking_reference!: string;
}