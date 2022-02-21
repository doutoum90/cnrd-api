import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<MemberDocument>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return new this.memberModel(createMemberDto).save();
  }

  findAll() {
    return this.memberModel.find().exec();
  }

  findOne(id: string) {
    return this.memberModel.findById(id).exec();
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    return this.memberModel.findByIdAndUpdate(id, updateMemberDto).exec();
  }

  remove(id: string) {
    return this.memberModel.findByIdAndDelete(id).exec();
  }
}
