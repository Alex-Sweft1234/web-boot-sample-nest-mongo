import { Types } from 'mongoose';

export class UsersResponse {
  data: {
    _id: Types.ObjectId;
    first_name: string;
    email: string;
    phone: string;
  };
  statusCode: number;
  message: string[];
  success: string;
}
