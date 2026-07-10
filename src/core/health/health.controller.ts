import { Controller, Get } from '@nestjs/common';
import { ApiResponseDto } from '../../shared/dto/api-response.dto';

@Controller('health')
export class HealthController {
  @Get()
  check(): ApiResponseDto<{ status: string }> {
    return ApiResponseDto.success('API operativa', {
      status: 'OK',
    });
  }
}