import { Document } from 'mongoose';
export interface Schedule extends Document {
  readonly startDate: Date;

  days: [
    {
      day: String;
      slots: [
        {
          slot: number;
          subject: String;
          description: String;
          students: {
            type: [
              {
                status: {
                  type: String;
                  enum: ['Approved', 'Pending'];
                  default: 'Pending';
                };
                id: String;
                firstName: String;
                lastName: String;
              }
            ];
            default: undefined;
          };
        }
      ];
    }
  ];
}
