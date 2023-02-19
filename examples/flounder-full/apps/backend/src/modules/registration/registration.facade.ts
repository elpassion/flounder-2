import { Injectable } from '@nestjs/common';
import { GetUserDto, SignUpDto } from '@flounder/contracts';
import { AuthFacade } from '../../auth/auth.facade';
import { UsersFacade } from '../../domain/users/users.facade';

@Injectable()
export class RegistrationFacade {
  constructor(private readonly authFacade: AuthFacade, private readonly usersFacade: UsersFacade) {}

  async registerUser(dto: SignUpDto): Promise<GetUserDto> {
    const { email, password } = dto;
    console.log(email);
    const cognito_id = await this.authFacade.signUp(email, password);

    return this.usersFacade.upsert({
      cognito_id,
      email,
    });
  }
}
