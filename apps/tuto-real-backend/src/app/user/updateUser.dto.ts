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
}
