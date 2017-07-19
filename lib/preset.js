var AWS = require('aws-sdk');

var elastictranscoder = new AWS.ElasticTranscoder();

var Create = function(params, reply) {
  elastictranscoder.createPreset(params, function(err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else  {
      reply(null, data.Preset.Id, { "Arn": data.Preset.Arn });
    }
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  Create(params, function(err, newPhysicalId, data) {
    if (err) return reply(err);
    Delete(physicalId, params, function(err) {
      reply(err, newPhysicalId, data);
    });
  });
};

var Delete = function(physicalId, params, reply) {
  var p = {
    Id: physicalId
  };
  elastictranscoder.deletePreset(p, function(err, data) {
    if (err) {
      console.error(err)
      if (err.code === 'ResourceNotFoundException') {
        err = null
      }
    }
    reply(err, physicalId);
  });
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
