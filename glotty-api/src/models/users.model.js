// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const users = new Schema({

    name: { type: String, required: true },
    email: {type: String, unique: true},
    password: { type: String },

    role: { type: String, default: 'organizationUser' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'organizations' },
    deleted: { type: Boolean, default: false },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};
