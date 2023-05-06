# TECHNICAL CHALLENGE BACKEND NODEJS - RICARDO CHOQUEHUANCA

This technical challenge is part of the evaluation process for the position of Backend Node.js Developer at INDRA. The task is to create an API in Node.js using the Serverless framework, in order to deploy it on AWS. The test API models must also be adapted and transformed, mapping the names of the model attributes from English to Spanish. In addition, you must integrate the StarWars test API and create a personal choice model by using a POST endpoint, storing the information in a database. Finally, a GET endpoint must be created that displays the stored information.

Contact:

- **Name:** Ricardo Genaro
- **Email:** genaro.choquehuanca.palli@gmail.com
- **URL:** <https://ricardo-genaro-portfolio.vercel.app/>

## Server

```sh
https://of39yj25b5.execute-api.us-east-1.amazonaws.com
```

## Tags

- **data:** All about data stored in DynamoDB
- **dataByEndpoint:** Interaction with SWAPI in a random search according to the requested endpoint, ending with the storage in DynamoDB
- **listApis:** List of all APIs that interact with SWAPI

## External Docs

- **Description:** Learn more about SWAPI
- **URL:** <https://swapi.py4e.com/documentation>

## Paths

### /data

#### POST

- **Tags:** data
- **Summary:** Add a new data to the database
- **Description:** Add a new data to the database
- **Operation ID:** addData
- **Request Body:**

    ```json
    {
      "description": "Create a new data in the database",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/ApiResponse"
          }
        }
      },
      "required": true
    }
    ```

- **Responses:**

    ```yaml
    '200':
      description: Successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiResponse'    
    '500':
      description: Error message
    ```

#### GET

- **Tags:** data
- **Summary:** Find all the data
- **Description:** Loop through and retrieve all data stored in DynamoDb
- **Operation ID:** getAllData
- **Responses:**

    ```yaml
    '200':
      description: successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiResponseArray'
    '500':
      description: Error message
    ```

### /data/{dataId}

#### GET

- **Tags:** data
- **Summary:** Find data by ID
- **Description:** Returns a single data
- **Operation ID:** getDataById
- **Parameters:**

    ```yaml
    - name: dataId
      in: path
      description: ID of data to return
      required: true
      schema:
        type: string
    ```

- **Responses:**

    ```yaml
    '200':
      description: successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiResponse'
    '500':
      description: Error message
    ```

### /dataByEndpoint

#### GET

- **Tags:** dataByEndpoint
- **Summary:** Search and store a random SWAPI data
- **Description:** Makes a query to SWAPI and returns a random object that belongs to any random category given by SWAPI (film, vehicle, people, ...), after which it proceeds to translate the keys of the returned object and store it in DynamoDb
- **Operation ID:** dataByEndpoint
- **Responses:**

    ```yaml
    '200':
      description: successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiResponse'
    '500':
      description: Error message
    ```

### /dataByEndpoint/{endpoint}

#### GET

- **Tags:** dataByEndpoint
- **Summary:** Find random data by category
- **Description:** Returns a single data
- **Parameters:**

    ```yaml
    - name: endpoint
      in: path
      description: Category of data to return
      required: true
      schema:
        type: string
    ```

- **Responses:**

    ```yaml
    '200':
      description: successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiResponse'
    '500':
      description: Error message
    ```

### /listApis

#### GET

- **Tags:** listApis
- **Summary:** List all apis available to query SWAPI
- **Description:** List all apis available to query SWAPI `API/dataByEndpoint/{endpoint}`
- **Operation ID:** listApis
- **Responses:**

    ```yaml
    '200':
      description: successful operation
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ListReponse'
    '500':
      description: Error message
    ```

## Components

### Schemas

#### Data

|Name|Type|
|----|----|
|nombre|string|
|modelo|string|
|fabricante|string|
|titulo|string|

#### BodyResponse

|Name|Type|
|----|----|
|id|string|
|data|[Data](#data)|

#### ApiResponse

|Name|Type|
|----|----|
|code|integer (int32)|
|type|string|
|body|[BodyResponse](#bodyresponse)|

#### ApiResponseArray

|Name|Type|
|----|----|
|code|integer (int32)|
|type|string|
|body|array of [BodyResponse](#bodyresponse)|

#### ListReponse

|Name|Type|
|----|----|
|code|integer (int32)|
|type|string|
|body|object|
|response|object|
|BASIC_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/)|>
|FILM_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/film)|>
|PEOPLE_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/people)|>
|PLANET_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/planet)|>
|SPECIE_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/specie)|>
|STARSHIP_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/starship)|>
|VEHICLE_RAMDOM_DATA|string (example: <https://of39yj25b5.execute-api.us-east-1.amazonaws.com/vehicle)|>
