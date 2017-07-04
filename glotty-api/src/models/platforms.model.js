// platforms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const platforms = new mongooseClient.Schema({
    name: { type: String, required: true, default: '' },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('platforms', platforms);
};
