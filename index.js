'use strict';
var AWS = require('aws-sdk'),
transcoder = new AWS.ElasticTranscoder({
        apiVersion: '2012-09-25',
        region: 'us-east-1' });
exports.handler = (event, context, callback) => {
    let fileName = event.Records[0].s3.object.key;
    var srcKey =  decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    console.log('Un nuevo video se ha cargado:', fileName);
    var params = 
        {
            PipelineId: "1631890102449-gbeppk",
            Input: 
            {
                Key: srcKey
            },
            Output: 
            {
                Key: 'transcoded-' + srcKey,
                PresetId: "1633543032427-p4fzm0",
                Watermarks: 
                    [{
                    InputKey: 'watermark-ceiba.png',
                    PresetWatermarkId: 'BottomRight'
                    }]
            }  
        }

    transcoder.createJob(params, function(err, data)
    {
        if(err)console.log('Se presentó un error:',err)
        else console.log('El proceso de transcodificación terminó con éxito.');
     callback(err, data);
    });
};
