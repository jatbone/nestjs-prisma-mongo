import { Controller, Post } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'
import { Public } from '@/common/decorators/public.decorator'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/guest-login')
  async guestLogin() {
    return this.authService.guestLogin()
  }
}
