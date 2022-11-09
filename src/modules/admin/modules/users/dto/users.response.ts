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

export class UsersListResponse {
  data: {
    items: {
      _id: Types.ObjectId;
      first_name: string;
      email: string;
      phone: string;
    }[];
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  statusCode: number;
  message: string[];
  success: string;
}

export class ChartResponse {
  data: {
    labels: string[];
    datasets: number[];
  };
  statusCode: number;
  message: string[];
  success: string;
}
