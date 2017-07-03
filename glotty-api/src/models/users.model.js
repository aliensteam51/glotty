// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    name: { type: String, required: true, default: '' },
    email: {type: String, unique: true},
    password: { type: String },

    role: { type: String, required: true, default: '' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'organizations' },
    deleted: { type: Boolean, default: false },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};
