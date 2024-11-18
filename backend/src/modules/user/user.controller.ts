import {Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CantPost, YsaNotfoundException} from "../../exceptions/ysa-notfound-exception";
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";

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

    @Post("/comments/:profileId")
    @UseGuards(TokenGuard)
    async postComments(@Param("profileId", ParseIntPipe) profileId: number,@UserID() userid: number, @Body()data: CreateCommentDto) {
        if(profileId===userid){
            throw new CantPost;
        }
        return this.userService.postComment(profileId,userid,data);
    }

    @Get("/comments/:id")
    @UseGuards(TokenGuard)
    async getComments(@Param("id", ParseIntPipe) id: number){
        return this.userService.getComments(id);
    }
}