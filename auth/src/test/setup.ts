import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'; // required for JWT.

  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for(const collection of collections){
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})