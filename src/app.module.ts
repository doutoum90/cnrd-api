import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdherantModule } from './adherant/adherant.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://cnrd:eLRVbWJ3blVipuc7@cnrddb.bhvkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      }),
    }),
    UsersModule,
    AdherantModule,
    ArticlesModule,
    CategoriesModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
