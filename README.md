# Tarea MongoDB

**Sebastian Garcia 201630047**

<hr/>

Conexión a MongoDB localmente. Con la colección *countries*, se hace un simple CRUD.

```sh
$ cd < este repositorio >
$ yarn install 	# npm install 
$ yarn start  # npm start
```

http://localhost:5000/countries

|  GET ALL | GET ONE   |   POST | PUT | DELETE | 
|---|---| ---|---| ---|
| countries/  |  countries/Colombia  | countries/Colombia {body} |countries/Colombia {body}  | countries/Colombia  |


<hr/>

Ejemplo

> POSTMAN : **/MongoTarea.postman_collection.json**

> con la extensión de VSCode, REST Client se pueden correr los siguientes en el archivo **/routes/countries.test.rest**

```sh

### GET
GET http://localhost:5000/countries

### GET ONE
GET http://localhost:5000/countries/Canada

### POST 
POST http://localhost:5000/countries
Content-Type: application/json

{
    "country":"Yugoslavia",
    "population":2,
    "continent":"Europa",
    "lifeExpectancy":23.8,
    "purchasingPower":4.5
}

### PATCH 
PATCH http://localhost:5000/countries/Colombia
Content-Type: application/json

{
    "population":12
}

### DELETE
DELETE http://localhost:5000/countries/Canada

```

