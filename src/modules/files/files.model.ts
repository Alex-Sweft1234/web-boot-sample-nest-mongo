import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty } from '@nestjs/swagger';
import { FileElement } from './dto/upload-file.response';
import { prop } from '@typegoose/typegoose';

export interface UploadDataFilesModel extends Base {}

export class UploadDataFilesModel extends TimeStamps {
  @ApiProperty()
  @prop()
  user_id: string;

  @ApiProperty({ type: [FileElement] })
  @prop()
  upload_files: FileElement[];
}
