# project-2-intro


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (Download and install from [Node.js official website](https://nodejs.org/))
- A package manager like npm (comes installed with Node.js)

Check Node.js and npm installation:

```bash
node --version
npm --version
```

### Installing

1. Clone the repository:
```
git clone https://github.com/IraEiza/devzon-back.git
cd devzon-back
```

2. Install dependencies:
```
npm install
``` 

3. Set up environment variables:
```
# Example .env file
DB_NAME="YOUR_DB_NAME"
DB_USER="YOUR_DB_USER"
DB_PASSWORD="YOUR_DB_PASSWORD"
DB_HOST="YOUR_DB_HOST"
DB_DIALECT="YOUR_DB_DIALECT"
DB_PORT=DB_PORT

BCRYPT_ROUNDS=number
JWT_SECRET="YOUR_SECRET"
``` 

4. Start the server:
```
npm start
``` 


### Additional Commands

- If you are doing dev stuff...
```
npm run dev
``` 

- If you have a build step...
```
npm run build
``` 


## API Routes


### User Signup/Login

| METHOD | ENDPOINT     | TOKEN | ROLE | DESCRIPTION   | POST PARAMS                                            | RETURNS                                           |
|--------|--------------|-------|------|---------------|--------------------------------------------------------|---------------------------------------------------|
| POST   | /auth/signup | -     | -    | User Signup   | `name`, `email`, `password`, `address`, `role`        | `{ token, user }` |


| METHOD | ENDPOINT    | TOKEN | ROLE | DESCRIPTION | POST PARAMS                | RETURNS                                           |
|--------|-------------|-------|------|-------------|----------------------------|---------------------------------------------------|
| POST   | /auth/login | -     | -    | User Login  | `email`, `password`        | `{ token, user }` |


## Product Routes

| METHOD | ENDPOINT            | TOKEN | ROLE  | DESCRIPTION               | POST PARAMS                                   | QUERY PARAMS                      | RETURNS                        |
|--------|---------------------|-------|-------|---------------------------|-----------------------------------------------|----------------------------------|--------------------------------|
| GET    | /products           | Yes   | -     | Get all products          | -                                             | `name`, `minPrice`, `maxPrice`   | `[{product1}, {product2}, ...]`  |
| GET    | /products/:productId| Yes   | -     | Get a single product      | -                                             | -                                | `{product}`                      |
| POST   | /products           | Yes   | Admin | Create a new product      | `name`, `price`, `description`, `image`       | -                                | `{product}`                      |
| PUT    | /products/:productId| Yes   | Admin | Update an existing product| `name`, `price`, `description`, `image`       | -                                | `{product}`                      |
| DELETE | /products/:productId| Yes   | Admin | Delete a product          | -                                             | -                                | `{product}`                      |


