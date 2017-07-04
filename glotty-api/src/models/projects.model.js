// projects-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const projects = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    organizationId: { type: Schema.Types.ObjectId, ref: 'organizations' },
    localeCodes: [{ type: String }],
    platformCodes: { type: Array, default: ['default'] },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('projects', projects);
};
