import { HttpStatus } from '@nestjs/common';

type ResSuccessProps = { data: any; statusCode: number; message: string[]; success: string };

export function responseSuccessful(
  data: any,
  statusCode: HttpStatus.OK | HttpStatus.CREATED,
  message: string[],
  success: string,
): ResSuccessProps {
  return { data, statusCode, message, success };
}
