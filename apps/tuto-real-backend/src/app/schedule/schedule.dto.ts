export class ScheduleDto {
  readonly startDate: Date;

  days: {
    day: String;
    slots: {
      //_id : String,
      slot: Number;
      subject: String;
      description: String;
      students: {
        status: {
          type: String;
          enum: ['Approved', 'Pending'];
          default: 'Pending';
        };
        id: String;
        firstName: String;
        lastName: String;
      }[];
    }[];
  }[];
}
