import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginUseCase } from './login.use-case';

@Injectable()
export class LoginService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async execute(
    request: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(request);
  }
}