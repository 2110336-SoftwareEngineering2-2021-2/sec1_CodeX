export class UpdateScheduleDto {
  days: [
    {
      day: String;
      slots: [
        {
          slot: Number;
          subject: String;
          description: String;
        }
      ];
    }
  ];
}
