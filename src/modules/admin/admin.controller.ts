import { Controller } from '@nestjs/common';
import { BasicGuard, JwtAuthGuard } from '../../components';
import { AdminService } from './admin.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-controller')
@Controller('admin')
@ApiBasicAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
