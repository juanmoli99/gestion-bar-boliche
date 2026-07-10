import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  async login(
    @Body() request: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.loginService.execute(request);
  }
}