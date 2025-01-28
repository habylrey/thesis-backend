import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllUsers () {
        console.log(this.userService.getAllUsers())
        return this.userService.getAllUsers()
    }

    @Get()
    async getUserByEmail(@Query('email') email: string) {
      return await this.userService.getUserByEmail(email);
    }
    

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): void {
        this.userService.createUser(createUserDto);
    }

}
