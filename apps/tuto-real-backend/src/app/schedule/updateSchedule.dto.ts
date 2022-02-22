export class UpdateScheduleDto {
  readonly days: [
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
