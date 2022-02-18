export class updateUserDto {

    readonly subjects: {type: [String],
        default: undefined};
    readonly description: {type: String,
        default: undefined};
    readonly firstName : String;
    readonly lastName : String;
    readonly birthDate : Date;
    readonly address : String;
    profileImg: {
        url: String;
    };
    profile64: String
    readonly numReviews: Number;
    readonly totalRating: Number;
    readonly zoom_id: String;
    readonly schedule_id: [String];
    readonly zoom_url: {type: String};
}
