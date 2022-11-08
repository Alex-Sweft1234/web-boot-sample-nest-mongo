import { IsString } from 'class-validator';

export class queryPaginationDto {
  @IsString()
  perPage: number;

  @IsString()
  page: number;
}
