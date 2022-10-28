import { ApiProperty } from '@nestjs/swagger';
import { ApiFile } from '../../_decorators/api-files.decorator';

export class SingleUploadFileDataDto {
  @ApiProperty({ type: String })
  user_id: string;

  @ApiFile()
  file: Express.Multer.File;
}

export class MultipleUploadFilesDataDto {
  @ApiProperty({ type: String })
  user_id: string;

  @ApiFile({ isArray: true })
  files: Array<Express.Multer.File>;
}
