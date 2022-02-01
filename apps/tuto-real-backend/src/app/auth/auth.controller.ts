import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll() {
    console.log('test');
    return this.authService.getAll();
  }

  @Post('signup')
  signUp(@Body() body: any) {
    console.log('Sign Up');
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  signIn(@Body() body: any) {
    console.log('Sign In');
    return this.authService.signIn(body.email, body.password);
  }

  @Post('signout')
  @UseGuards(FirebaseAuthGuard)
  signOut() {
    console.log('Sign Out');
    return this.authService.signOut();
  }
}
