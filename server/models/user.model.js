/**
* Name: group 3 
* Date: 17th November 2023
* Description: model for users 
 */
import mongoose from 'mongoose'
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
 name: {
 type: String,
 trim: true,
 required: 'Name is required'
 },
 email: {
 type: String,
 trim: true,
unique: 'Email Address already exists',
match: [/.+\@.+\..+/, 'Please enter a valid email address'],
required: 'Email Address is required'
 },
 created: {
type: Date,
default: Date.now
   },
 updated: {
type: Date,
default: Date.now
},
hashed_password: {
type: String,
required: 'Password is required'
},
 salt: String
});
UserSchema.virtual('password')
 .set(function(password) {
 this._password = password;
 this.salt = this.makeSalt(); 
 this.hashed_password = this.encryptPassword(password)
 //this.hashed_password = password;
})
.get(function() {
return this._password;
 });
UserSchema.path('hashed_password').validate(function(v) {
 if (this._password && this._password.length < 6) {
 this.invalidate('password', 'Password must be at least 6 characters.');
}
 if (this.isNew && !this._password) {
this.invalidate('password', 'Password is required');
 }
}, null);
UserSchema.methods = {
authenticate: function(plainText) {
  console.log('encrypted',this.encryptPassword(plainText), 
  'hashed', this.hashed_password)
return plainText === this.hashed_password 
},
encryptPassword: function(password) { 
if (!password) return ''
try {
return crypto
.createHmac('sha1', this.makeSalt()) 
.update(password)
.digest('hex') 
} catch (err) {
    console.log(err);
return '' 
}
},
makeSalt: function() {
return Math.round((new Date().valueOf() * Math.random())) + '' 
}
}
export default mongoose.model('User', UserSchema);