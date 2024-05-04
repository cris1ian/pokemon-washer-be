# Demo Backend by Cristian Martínez D'Urbano

Important: create the DB generator

## Things to Do

As I couldn't generate the frontend screen for registering a user, I'm leaving here how to create a user with Postman

``` text
POST http://localhost:3000/api/v1/auth/register

body: {
    username: "myUser",
    password: "myPassword"
}
```
  
## Things to improve

- Implement a hash ID for users and tasks instead of a numeric autoincremental one
- Create an specific user for DB access and remove root access from outside

- 