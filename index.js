var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var Preset = require('./lib/preset');

function ElasticTranscoderPresetHandler(event, context) {
  var ElasticTranscoderPreset = CfnLambda({
    Create: Preset.Create,
    Update: Preset.Update,
    Delete: Preset.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return ElasticTranscoderPreset(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = ElasticTranscoderPresetHandler;
