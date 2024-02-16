import { Injectable, NotFoundException } from '@nestjs/common';

import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  public async insertUser(username, age, hobbies) {
    // Generate a single UUID
    const uuid: string = uuidv4();
    console.log('Generated UUID:', uuid);
    const newUsers = new this.userModel({ username, age, hobbies, uuid });
    let result = await newUsers.save();
    return { status: 'success', message: 'Record successfully created' };
  }

  public async getUserList() {
    const result = await this.userModel.find();
    const resultData = result.map((resData) => ({
      id: resData._id,
      username: resData.username,
      age: resData.age,
      hobbies: resData.hobbies,
      uuid: resData.uuid
      
    }));
    return {
      status: 'success',
      data: resultData,
      message: 'Record fetching successfully created',
    };
  }

  public async getSingleUser(userId: string) {
    const findUser = await this.findUser(userId);
    if (!findUser) {
      return 'user is not found';
    }
    return {
      status: 'success',
      data: findUser,
      message: 'Record fetching successfully created',
    };
  }

  public async updateUser(userId, username, age, hobbies) {
    const findUser = await this.findUser(userId);
    if (findUser.status === 'failed') {
      return findUser;
    }
    if (username) {
      findUser.username = username;
    }
    if (age) {
      findUser.age = age;
    }
    if (hobbies) {
      findUser.hobbies = hobbies;
    }

    findUser.save();
    return { status: 'success', message: 'Record successfully updated' };
  }

  public async deleteUser(userId: string) {
    let findUser = await this.userModel.findById(userId);

    if (!findUser) {
      return { status: 'failed', message: 'Record not found in system' };
    }
    const user = await this.userModel.deleteOne({ _id: userId });
    return { status: 'success', message: 'Record successfully deleted' };
  }

  private async findUser(userId: string): Promise<any> {
    let id = userId;
    let findUser;
    try {
      findUser = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('could not found user');
    }

    if (!findUser) {
      return {
        status: 'failed',
        message: 'user record is not found in system',
      };
    }
    return findUser;
  }
}
