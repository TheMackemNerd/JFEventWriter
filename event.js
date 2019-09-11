// JavaScript source code
// Set the region we will be using..

function SendEvent(clientid, batchtext, eventcount) {
    
    AWS.config.region = 'eu-west-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:6a49ce95-ab05-4680-b6a5-fc0babf54e36',
    });

    // Create SQS service client
    const sqs = new AWS.SQS();
    const params = {
        MessageBody: JSON.stringify({

            client_id: clientid,
            batch_text: batchtext,
            date: (new Date()).toISOString()
        }),
        QueueUrl: `https://sqs.eu-west-1.amazonaws.com/245633934812/JFQueue`
    };

    var i;
    for (i = 0; i < eventcount; i++) {
        sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Successfully added message", data.MessageId);
            }
        });
    }


}


