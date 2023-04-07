# My Azure Function

This Azure Function App allows you to create a new contract, get all contracts or one specific contract. All these routes
are protected.

## Getting Started

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `local.settings.json` file and add the necessary environment variables (see below)
4. Install Azure-functions-core-tools from here https://github.com/Azure/azure-functions-core-tools#installing
5. Start the function using `npm start`

## Environment Variables

This function requires the following environment variables to be set:

- `MONGODB_URI`: the URI for connecting to your MongoDB instance
- `JWT_SECRET`: the secret key for generating JSON Web Tokens (JWTs)
- `FUNCTIONS_WORKER_RUNTIME` set to node (paste object given below in local.settings.json file)
  {
  "IsEncrypted": false,
  "Values": {
  "AzureWebJobsStorage": "",
  "FUNCTIONS_WORKER_RUNTIME": "node",
  "MONGO_URI": "",
  "JWT_SECRET": ""
  }
  }

## API Documentation

### POST /api/createContract

Creates a new contract in the database.

#### Request

The request body must be a JSON object conforming to the following schema:
{
userID: “uuid”,
contractName: “Another String”,
templateID: “uuid”
}

#### Response

If the request is successful, the response will be a JSON object with the following properties:

- `status`: 200
- `success`: true
- `body`: a string indicating the ID of the newly created contract

If the request is unsuccessful, the response will be a JSON object with the following properties:

- `status`: 400 (for invalid request data) or 409 (for document already exists)
- `success`: false
- `body`: a string indicating the reason for the failure

### Error Handling

If an error occurs during processing, the response will have a `status` of 500 and a `body` indicating the error message.

### POST /api/createUser

Creates a new user in the database.

#### Request

The request body must be a JSON object conforming to the following schema:

{
"username": "user1",
"password": "password123"
}

#### Response

If the request is successful, the response will be a JSON object with the following properties:

- `status`: 200
- `success`: true
- `body`: a string indicating the ID of the newly created user

If the request is unsuccessful, the response will be a JSON object with the following properties:

- `status`: 400 (for invalid request data)
- `success`: false
- `body`: a string indicating the reason for the failure

### Error Handling

If an error occurs during processing, the response will be a a JSON object with the following properties:

- `status` 500
- `success` false
- `body` indicating the error message with internal server error.

### GET /api/getContract/{id}

Retrieves a specific contract by ID from the database.

#### Request

The request must contain an `id` parameter in the URL, which corresponds to the ID of the contract to retrieve.

#### Response

If the contract is found, the response will be a JSON object with the following properties:

- `status`: 200
- `success`: true
- `body`: the document for the requested contract

If the contract is not found, the response will be a JSON object with the following properties:

- `status`: 404
- `success`: false
- `body`: "Document Not found"

### Error Handling

If an error occurs during processing, the response will be a a JSON object with the following properties:

- `status` 500
- `success` false
- `body` indicating the error message with internal server error.

### GET /api/getContractIds

This Azure Function retrieves all the contracts from the database.

## Request

This function is triggered by an HTTP GET request. No parameters are required in the request URL.

## Response

If the contracts are found, the response will be a JSON object with the following properties:

- `status`: 200
- `success`: true
- `body`: an array of contract IDs

If there are no contracts found, the response will be a JSON object with the following properties:

- `status`: 404
- `success`: false
- `body`: "No contracts found"

### Error Handling

If an error occurs during processing, the response will be a a JSON object with the following properties:

- `status` 500
- `success` false
- `body` indicating the error message with internal server error.

## User Authentication API

This API allows users to authenticate and generate a JWT token for use with other endpoints.

### POST /api/login

Authenticates a user with a username and password, and returns a JWT token if the credentials are valid.

#### Request

The request body must be a JSON object with the following properties:

- `username`: The username of the user to authenticate.
- `password`: The password of the user to authenticate.

#### Response

If the user is authenticated, the response will be a JSON object with the following properties:

- `status`: 200
- `success` false
- `body`: A JWT token that can be used with other endpoints.

If the credentials are invalid, the response will be a JSON object with the following properties:

- `status`: 401
- `success` false
- `body`: "Invalid username or password".

If the request body is invalid or missing any required properties, the response will be a JSON object with the following properties:

- `status`: 400
- `success` false
- `body`: "Invalid request data." followed by a description of the error.

### Error Handling

If an error occurs during processing, the response will be a a JSON object with the following properties:

- `status` 500
- `success` false
- `body` indicating the error message with internal server error.
