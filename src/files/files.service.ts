import { HttpStatus, Injectable } from '@nestjs/common';
import { FileElement, FilesResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MESSAGE, STATUS } from './files.constant';

@Injectable()
export class FilesService {
  responseSuccessful(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async saveFile(files: Express.Multer.File[]): Promise<FilesResponse> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);

    const uploadDataFiles: FileElement[] = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      uploadDataFiles.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
    }

    return this.responseSuccessful(
      uploadDataFiles,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPLOAD],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}
