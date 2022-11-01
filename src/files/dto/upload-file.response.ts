import { ApiProperty } from '@nestjs/swagger';

export class FileElement {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;
}

export class UploadDataFiles {
  @ApiProperty()
  user_id: string;

  @ApiProperty({ type: [FileElement] })
  upload_files: FileElement[];
}

export class UploadFilesResponse {
  @ApiProperty({ type: UploadDataFiles })
  data: {
    user_id: string;
    upload_files: FileElement[];
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
