import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UploadDataFilesModel } from './files.model';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UploadDataFilesModel,
        schemaOptions: {
          collection: 'Files',
        },
      },
    ]),
  ],
})
export class FilesModule {}
