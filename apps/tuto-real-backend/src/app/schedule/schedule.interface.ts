import { Document } from 'mongoose';
export interface Schedule extends Document {
  readonly startDate: Date;

  days: [
    {
      day: string;
      slots: [
        {
          slot: number;
          subject: string;
          description: string;
          students: {
            type: [
              {
                status: {
                  type: string;
                  enum: ['Approved', 'Pending'];
                  default: 'Pending';
                };
                id: string;
                firstName: string;
                lastName: string;
              }
            ];
            default: undefined;
          };
        }
      ];
    }
  ];
}
