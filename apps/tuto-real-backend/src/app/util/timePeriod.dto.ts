

export class TimePeriodDto {

    //readonly subjects: [String];
    //readonly description : String;
    readonly day : String;
    readonly time : {
        start : Number,
        end : Number
    }[] ;
   
}
