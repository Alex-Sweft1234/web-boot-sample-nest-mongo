import { HttpStatus, Injectable } from '@nestjs/common';
import { FileElement, UploadFilesResponse } from '../dto/upload-file.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MESSAGE, STATUS } from '../files.constant';
import { UploadDataFilesModel } from '../files.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class FilesService {
  constructor(@InjectModel(UploadDataFilesModel) private readonly uploadFilesModel: ModelType<UploadDataFilesModel>) {}

  responseSuccessful(data: any, statusCode: HttpStatus.OK, message: string[], success: string) {
    return { data, statusCode, message, success };
  }

  async saveSingleFile(data: { user_id: any; file: Express.Multer.File }): Promise<UploadFilesResponse> {
    const { user_id, file } = data;
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}/${user_id}`;
    const uploadDataFiles: FileElement[] = [
      { url: `/uploads/${dateFolder}/${user_id}/${file.originalname}`, name: file.originalname },
    ];

    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

    const uploadDataModel = {
      user_id,
      upload_files: uploadDataFiles,
    };
    const uploadFiles = new this.uploadFilesModel(uploadDataModel);

    await uploadFiles.save();

    return this.responseSuccessful(
      uploadDataModel,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPLOAD],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async saveMultipleFiles(data: { user_id: any; files: Array<Express.Multer.File> }): Promise<UploadFilesResponse> {
    const { user_id, files } = data;
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}/${user_id}`;
    await ensureDir(uploadFolder);

    const uploadDataFiles: FileElement[] = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      uploadDataFiles.push({ url: `/uploads/${dateFolder}/${user_id}/${file.originalname}`, name: file.originalname });
    }

    const uploadDataModel = {
      user_id,
      upload_files: uploadDataFiles,
    };
    const uploadFiles = new this.uploadFilesModel(uploadDataModel);

    await uploadFiles.save();

    return this.responseSuccessful(
      uploadDataModel,
      HttpStatus.OK,
      [MESSAGE.SUCCESS_UPLOAD],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }
}
