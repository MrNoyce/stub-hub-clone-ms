import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the props required to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the props that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
	build(attrs: UserAttrs): UserDocument;
}

// An interface that describes the props that a user document has
interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
}

// create schema for a user
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		}, // logic to remove props from data
	}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);

		done();
	}
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

// helps TS to make user and should be used when making new users
// const buildUser = (attrs: UserAttrs) => new User(attrs);

const user = User.build({ email: 'test@test.com', password: '1234' });

export { User };
