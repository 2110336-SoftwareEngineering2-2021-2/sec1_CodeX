export class UserDto {
  //readonly subjects: [String];
  //readonly description : String;
  readonly firstName: String;
  readonly lastName: String;
  readonly phoneNumber: String;
  readonly email: String;
  readonly birthDate: Date;
  readonly address: String;
  readonly citizenID: String;
  role: String;
  profileImg: {
    url: String;
  };
}
