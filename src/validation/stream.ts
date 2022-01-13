const Joi = require("joi").extend(require("@joi/date"));

export const StreamValidate = Joi.object({
  stream_title: Joi.string().min(3).max(30).required(),
  stream_description: Joi.string().min(3).max(30).required(),
  stream_date: Joi.date().format("YYYY-MM-DD").utc().required(),
  tags: Joi.array().items(Joi.string()).required(),
  stream_platforms: Joi.object().keys({
    instagram: Joi.boolean(),
    facebook: Joi.boolean(),
    twitter: Joi.boolean(),
    youtube: Joi.boolean(),
    mixlr: Joi.boolean(),
  }),
  stream_video_edits: Joi.object().keys({
    transcribe: Joi.boolean(),
    translate_caption: Joi.boolean(),
    translate_audio: Joi.boolean(),
  }),
  countdown: Joi.boolean(),
});
