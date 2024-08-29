const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "Customers",
    Key: {
      customerId: data.customerId,
    },
  };

  try {
      const result = await dynamo.get(params).promise()
  
      if(!result.Item || result.Item.password !== data.password){
          return {
              statusCode:401,
              body: JSON.stringify({message: "Credenciais inválidas"})
          }
      }
  
      return {
          statusCode: 200,
          body: JSON.stringify({message: "Login realizado com sucesso"})
      }
  } catch(error) {
    return {
        statusCode: 500,
        body: JSON.stringify({message: "Erro ao realizar login"})
    }
  }

};

