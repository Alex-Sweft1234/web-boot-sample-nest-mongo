import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class FileElement {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;
}

export class UploadFiles {
  @ApiProperty({ type: Types.ObjectId })
  user_id: Types.ObjectId;

  @ApiProperty({ type: [FileElement] })
  upload_files: FileElement[];
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
    upload_files: UploadFiles;
  };

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ type: () => [String] })
  message: string[];

  @ApiProperty()
  success: string;
}
