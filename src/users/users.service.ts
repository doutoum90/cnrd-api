import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as serviceAccount from '../cnrd.json';

@Injectable()
export class UsersService {
  db;
  userRef;
  userChild;
  constructor() {
    // const serviceAccount = require('./firebase/cnrd-df83c-firebase-adminsdk-suagu-348b8b4486.json');
    const admin = require('firebase-admin');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),

      authDomain: 'cnrd-df83c.firebaseapp.com',
      databaseURL:
        'https://cnrd-df83c-default-rtdb.europe-west1.firebasedatabase.app/',
    });
    this.db = admin.database();
    this.userRef = this.db.ref('users');
  }

  create(createUserDto: CreateUserDto) {
    const userRef = this.userRef;
    console.log(createUserDto);
    if (createUserDto) {
      return this.userRef
        .child(createUserDto?.id)
        .set({ nom: createUserDto?.nom, prenom: createUserDto?.prenom })
        .then(function () {
          return userRef.once('value');
        });
    } else {
      return 'Valeur incorrecte aussi';
    }
  }

  findAll() {
    return this.userRef.once('value');
  }

  findOne(id: number) {
    return this.db.ref(`users/${id}`).once('value');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
