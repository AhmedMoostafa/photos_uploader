# kenzz_photos_uploader

Mopile Application To Upload And Borwse Images
## Screenshots

![Created Screens](/screens.jpg)

## Features

- Signup
- Login
- Upload Photo
- Upadte Photo
- Browse Photos
- Open Photo Details

## How To Install

- For Backend : Pull main branch
- For Mobile App : Pull mobile-app branch

### Nodejs Backend

- Create .env file in the root directory
- You need to define these enviroment variables

```sh
JWT_SECRET =
PORT =
PASSWORD_SALT =
```

#### Install dependencies

`$ npm install`

#### Start Server

`$ npm start`

### React Native -Expo Application

- You need to define these enviroment variables

```sh
BACKEND_URL =

```

### Download Expo App on ypur mobile

https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1

#### Start The Application

`$ npx expo start`

#### Scan The QR Code using the app

# Backend API

### You can test the following endpoints using Postman. You will find the Postman collection inside the 'postmanCollection' folder

### User Signup

```http
  POST /user/login
```

- Request Body

```json
{
  "email": "ahmedMostafa12@gmail.com",
  "password": "12345678",
  "firstName": "ahmed"
}
```

- Response Body

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsI......"
}
```

### User Login

```http
  POST /user/login
```

- Request Body

```json
{
  "email": "ahmedMostafa@gmail.com",
  "password": "12345678"
}
```

- Response Body

```json
{
  "user": {
    "id": "616f8f5a-486a-4416-b6d3-3bf1d0414c1a",
    "firstName": "ahmed",
    "email": "ahmedMostafa@gmail.com"
  },
  "jwt": "eyJhbGciOiJIU............"
}
```

### Get List of Photos

```http
  GET /photos/list
```

- or

```http
  GET /photos/list?size=10&skip=0
```

- Request Header

```json
{
  "Authorization": "Bearer  JWT"
}
```

- Response Body

```json
{
    "photos": [
        {
            "id": "535d7618-01af-4bef-83dc-2dfd6783b74e",
            "title": "title 1",
            "description": "description 2",
            "path": "images\\2024-02-10T19-34-17.480Z-6ba0aebd-413a-4ea7-8cae-267e0d730fd2.jpeg",
            "userId": "616f8f5a-486a-4416-b6d3-3bf1d0414c1a",
            "createdAt": 1707593657770
        },
        {
            "id": "2a1f0681-e3c4-41b7-a94c-7caf9b3afdfc",
            "title": "title 2",
            "description": "description 2",
            "path": "images\\2024-02-10T19-36-15.541Z-50270d18-46bc-47ff-b7c4-6ac2cbc31d72.jpeg",
            "userId": "616f8f5a-486a-4416-b6d3-3bf1d0414c1a",
            "createdAt": 1707593775574

    ]
}
```

### Photo By ID

```http
  GET /photos/photo/:id
```

```http
  GET /photos/photo/78f237ca-936f-405d-b48d-191da6b6c45f
```

- Request Header

```json
{
  "Authorization": "Bearer  JWT"
}
```

- Response Body

```json
{
  "photo": {
    "id": "535d7618-01af-4bef-83dc-2dfd6783b74e",
    "title": "title",
    "description": "description",
    "path": "images\\2024-02-10T19-34-17.480Z-6ba0aebd-413a-4ea7-8cae-267e0d730fd2.jpeg",
    "userId": "616f8f5a-486a-4416-b6d3-3bf1d0414c1a",
    "createdAt": 1707593657770
  }
}
```

### Upload Photo

```http
  POST /photos/upload/
```

- Request Header

```json
{
  "Authorization": "Bearer  JWT",
  "Content-Type": "multipart/form-data"
}
```

- Request File With Filed Name "image"

```json
{
  "title": "title",
  "description": "description"
}
```

- Response Body

```json
{
  "photo": {
    "id": "5a28ccf7-c607-49f0-8347-323a5169d968",
    "description": "description ",
    "title": "title ",
    "createdAt": 1707633409776,
    "path": "images\\2024-02-11T06-36-49.747Z-Screenshot 2023-08-10 165725.png",
    "userId": "f1a138a3-6a4f-47a2-96b1-1eefd9645b9a"
  }
}
```

### Upadate Photo

```http
  PATCH /photos/update/:id
```

- Request Header

```json
{
  "Authorization": "Bearer  JWT"
}
```

- Request Body

```json
{
  "title": "title",
  "description": "description"
}
```

- Response Body

```json
{
  "photo": {
    "id": "5a28ccf7-c607-49f0-8347-323a5169d968",
    "title": "new title",
    "description": "new description",
    "path": "images\\2024-02-11T06-36-49.747Z-Screenshot 2023-08-10 165725.png",
    "userId": "f1a138a3-6a4f-47a2-96b1-1eefd9645b9a",
    "createdAt": 1707633409776
  }
}
```
