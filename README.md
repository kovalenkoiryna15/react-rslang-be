# LearnWords
A backend part of [React RS.School task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md)

#### [Wiki](https://github.com/rolling-scopes-school/-LearnWords-react/wiki)  
#### [Swagger documentation](https://rslang-app-be.herokuapp.com/doc/)
#### [Examples of API requests](https://github.com/rolling-scopes-school/-LearnWords-react/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2-%D0%BA-API)

## Quick Start

1. Create file with ```.env``` extension in your local root directory
2. Define environment variables:  
```
PORT=<port where app will be running>
MONGO_CONNECTION_STRING=<address of your local or cloud mongodb>
JWT_SECRET_KEY=<secret key for signing JWT>
JWT_REFRESH_SECRET_KEY=<secret key for signing refresh JWT>
```
3. Run app in dev mode
```bash
$ npm install
$ npm run start:dev
```
