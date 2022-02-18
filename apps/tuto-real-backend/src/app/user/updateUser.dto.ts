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
    readonly zoomID: String;
    readonly zoomStartURL: String;
    readonly zoomJoinURL: String;
    readonly schedule_id: [String];
}
