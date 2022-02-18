export class UserDto {
  readonly subjects: { type: [String]; default: undefined };
  readonly description: { type: [String]; default: undefined };
  
  readonly ratePrice : {type : Number , default : undefined};
  readonly schedule : {type : Object , default : undefined};

  readonly firstName: String;
  readonly lastName: String;
  readonly phoneNumber: String;
  readonly email: String;
  readonly birthDate: Date;
  readonly address: String;
  readonly citizenID: String;
  role: String;
  readonly zoomID: String;
  readonly zoomStartURL: String;
  readonly zoomJoinURL: String;
  profileImg: {
    url: String;
  };
  readonly zoom_id: String;
  readonly schedule_id: [String];
  readonly zoom_url: {type: String};
  readonly numReviews: Number;
  readonly totalRating: Number;
}
