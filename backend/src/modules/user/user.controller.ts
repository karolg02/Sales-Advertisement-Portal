import {Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user =  await this.userService.create(createUserDto);
        return plainToInstance(UserDto,user);
    }

    @Get('/me')
    @UseGuards(TokenGuard)
    async me(@UserID() userId: number){
        const user = await this.userService.findOne(userId);
        return plainToInstance(UserDto,user);
    }

    @Get('/get/:userId')
    @UseGuards(TokenGuard)
    async getUser(@Param("userId", ParseIntPipe) id: number){
        const user = await this.userService.findOne(id);
        return plainToInstance(UserDto,user);
    }
}