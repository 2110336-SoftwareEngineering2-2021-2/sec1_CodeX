import { TimePeriodDto } from "../util/timePeriod.dto";


export class BookingDto {

    //readonly subjects: [String];
    //readonly description : String;
    readonly firstName : String;
    readonly lastName : String;
    readonly email : String;
    timeStamp : Date;
    readonly tutorMail : String;
    status : String;
    readonly timePeriod : TimePeriodDto[];
}
