import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdherantDto } from './dto/create-adherant.dto';
import { UpdateAdherantDto } from './dto/update-adherant.dto';
import { Adherant, AdherantDocument } from './entities/adherant.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdherantService {
  constructor(
    @InjectModel(Adherant.name)
    private readonly adherantModel: Model<AdherantDocument>,
  ) {}
  create(createAdherantDto: CreateAdherantDto) {
    return new this.adherantModel(createAdherantDto).save();
  }

  async findAll(): Promise<Adherant[]> {
    return this.adherantModel.find().exec();
  }

  async findOne(id: string) {
    return this.adherantModel.findById(id);
  }

  update(id: string, updateAdherantDto: UpdateAdherantDto) {
    return this.adherantModel.findByIdAndUpdate(id, updateAdherantDto);
  }

  remove(_id: string) {
    return this.adherantModel.deleteOne({ _id });
  }
}
