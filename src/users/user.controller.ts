import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async addUser(
    @Body('username') username: string,
    @Body('age') age: number,
    @Body('hobbies') hobbies: string[],
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({
          status: 'failed',
          message: 'Username should be a non-empty string',
        });
      }
      if (!age || typeof age !== 'number') {
        return res.status(400).json({
          status: 'failed',
          message: 'Age should be a non-empty number',
        });
      }
      if (!Array.isArray(hobbies) || hobbies.length === 0) {
        return res.status(400).json({
          status: 'failed',
          message: 'Hobbies should be a non-empty array',
        });
      }
      const resultData = await this.userService.insertUser(
        username,
        age,
        hobbies,
      );
      return res.status(200).json(resultData);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Get()
  public async getUserList(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let result = await this.userService.getUserList();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Get(':id')
  public async getUser(
    @Param('id') userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let result = await this.userService.getSingleUser(userId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') userId: string,
    @Body('username') username: string,
    @Body('age') age: number,
    @Body('hobbies') hobbies: string[],
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let result = await this.userService.updateUser(
        userId,
        username,
        age,
        hobbies,
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id') userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let result = await this.userService.deleteUser(userId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }
}
