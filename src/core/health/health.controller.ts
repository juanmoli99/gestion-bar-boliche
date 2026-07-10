import { Controller, Get } from '@nestjs/common';
import { ApiResponseDto } from '../../shared/dto/api-response.dto';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('health')
export class HealthController {
  
  @Public()
  @Get()
  check(): ApiResponseDto<{ status: string }> {
    return ApiResponseDto.success('API operativa', {
      status: 'OK',
    });
  }
}