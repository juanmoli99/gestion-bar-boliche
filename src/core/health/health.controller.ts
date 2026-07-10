import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      success: true,
      message: 'API operativa',
      timestamp: new Date().toISOString(),
    };
  }
}