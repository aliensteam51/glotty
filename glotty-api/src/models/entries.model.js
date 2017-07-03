// entries-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const translationSchema = new Schema({
    localeId: { type: Schema.Types.ObjectId, ref: 'locales' },
    translation: { type: String, default: '' }
  })

  const platformSchema = new Schema({
    platformId: { type: Schema.Types.ObjectId, ref: 'platforms' },
    translations: [translationSchema]
  })

  const entries = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    group: { type: String },
    tags: [{type: String}],
    platforms: [platformSchema],
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('entries', entries);
};
