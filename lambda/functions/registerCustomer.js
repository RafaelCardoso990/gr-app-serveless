const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient()
const ses = new AWS.SES()
const sns = new AWS.SNS()

exports.handler() = async (event) => {
    const data = JSON.parse(event.body)
    const params = {
        TableName: 'Customers',
        Item: {
            customerId: data.customerId,
            name: data.name,
            eamil: data.eamil,
            phone: data.phone,
        }
    }

    try {
        await dynamo.put(params).promise()

        // Enviar email
        await ses.sendEmail({
            Destination: {ToAddresses: [data.eamil]},
            Message: {
                Body: {Text: {Data: `Olá ${data.name}, seu cadastro foi realizado com sucesso na GR Tecnica Automotiva`}},
                Subject: {Data: "Confirmação de cadastro"}
            },
            Source: "rafaelcardoso990@gmail.com"
        }).promise()

        await sns.publish({
            Message: `Olá ${data.name}, seu cadastro foi realizado com sucesso!`,
            PhoneNumber: data.phone
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Cadastro realizado com sucesso!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao realizar cadastro" }),
        };
    }
};