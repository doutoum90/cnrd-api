import { Module } from '@nestjs/common';
import { AdherantService } from './adherant.service';
import { AdherantController } from './adherant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Adherant, AdherantSchema } from './entities/adherant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Adherant.name, schema: AdherantSchema },
    ]),
  ],
  controllers: [AdherantController],
  providers: [AdherantService],
})
export class AdherantModule {}
