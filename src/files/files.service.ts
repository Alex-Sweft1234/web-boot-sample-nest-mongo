import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { FileElement, UploadFilesResponse } from './dto/upload-file.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MESSAGE, STATUS } from './files.constant';
import { Observable } from 'rxjs';

@Injectable()
export class FilesService {
  responseSuccessful(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async saveSingleFile(data: { user_id: any; file: Express.Multer.File }): Promise<UploadFilesResponse> {
    const { user_id, file } = data;
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);

    const uploadDataFiles: FileElement[] = [];

    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
    uploadDataFiles.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });

    return this.responseSuccessful(
      {
        user_id,
        upload_files: uploadDataFiles,
      },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPLOAD],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async saveMultipleFiles(data: any, files: Express.Multer.File[]): Promise<UploadFilesResponse> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);

    const uploadDataFiles: FileElement[] = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      uploadDataFiles.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
    }

    return this.responseSuccessful(
      {
        user: data.user_id,
        uploadDataFiles,
      },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPLOAD],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}

@Injectable()
export class FileSingleToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    if (req.body && req.file?.fieldname) {
      const { fieldname } = req.file;
      if (!req.body[fieldname]) {
        req.body[fieldname] = req.file;
      }
    }

    return next.handle();
  }
}

@Injectable()
export class FileMultipleToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    if (req.body && Array.isArray(req.files) && req.files.length) {
      req.files.forEach((file: Express.Multer.File) => {
        const { fieldname } = file;
        if (!req.body[fieldname]) {
          req.body[fieldname] = [file];
        } else {
          req.body[fieldname].push(file);
        }
      });
    }

    return next.handle();
  }
}
