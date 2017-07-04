// entries-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const translationSchema = new Schema({
    localeId: { type: Schema.Types.ObjectId, ref: 'locales' },
    localeCode: { type: String },
    translation: { type: String, default: '' }
  })

  const platformSchema = new Schema({
    platformId: { type: Schema.Types.ObjectId, ref: 'platforms' },
    platformCode: { type: String },
    translations: [translationSchema]
  })

  const entries = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    group: { type: String },
    tags: [{type: String}],
    projectId: { type: Schema.Types.ObjectId, ref: 'projects' },
    platforms: [platformSchema],
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('entries', entries);
};
