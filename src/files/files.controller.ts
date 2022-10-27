import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../_guards';
import { FilesResponse } from './dto/file-element.response';
import { FilesService } from './files.service';

@ApiTags('Files-controller')
@ApiBearerAuth()
@Controller('private/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload successfully',
    type: FilesResponse,
    links: {},
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(@UploadedFile() file: Express.Multer.File): Promise<FilesResponse> {
    return this.filesService.saveFile([file]);
  }
}
