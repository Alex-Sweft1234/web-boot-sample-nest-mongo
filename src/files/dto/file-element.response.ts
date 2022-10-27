import { ApiProperty } from '@nestjs/swagger';

export class FileElement {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;
}

export class UploadFiles {
  @ApiProperty({ type: [FileElement] })
  upload_files: FileElement[];
}

export class FilesResponse {
  @ApiProperty({ type: UploadFiles })
  data: {
    upload_files: UploadFiles;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
