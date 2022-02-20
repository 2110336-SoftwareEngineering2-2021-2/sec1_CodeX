export class ScheduleDto {
  readonly startDate: Date;
  pricePerSlot: Number;
  days: {
    day: String;
    slots: {
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
