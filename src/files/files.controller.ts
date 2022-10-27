import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../_guards';
import { UploadFilesResponse } from './dto/upload-file.response';
import { FilesService, FileSingleToBodyInterceptor, FileMultipleToBodyInterceptor } from './files.service';
import { SingleUploadFileDataDto, MultipleUploadFilesDataDto } from './dto/upload-files.dto';
import { MESSAGE } from './files.constant';

@ApiTags('Files-controller')
@ApiBearerAuth()
@Controller('private/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('single/upload')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SingleUploadFileDataDto })
  @UseInterceptors(FileInterceptor('file'), FileSingleToBodyInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload successfully',
    type: UploadFilesResponse,
    links: {},
  })
  async uploadSingleFile(@Body() body: SingleUploadFileDataDto): Promise<UploadFilesResponse> {
    if (!body.file) {
      throw new BadRequestException([MESSAGE.BAD_REQUEST_UPLOAD]);
    }
    return this.filesService.saveSingleFile(body);
  }

  @Post('multiple/upload')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MultipleUploadFilesDataDto })
  @UseInterceptors(FileInterceptor('files'), FileMultipleToBodyInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload successfully',
    type: UploadFilesResponse,
    links: {},
  })
  async uploadMultipleFiles(@Body() body: MultipleUploadFilesDataDto): Promise<UploadFilesResponse> {
    // return this.filesService.saveMultipleFiles(body);
    if (!body.files) {
      throw new BadRequestException([MESSAGE.BAD_REQUEST_UPLOAD]);
    }
    console.log(body);
    return;
  }
}
