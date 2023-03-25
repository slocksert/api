# api
API with authentication, using FastAPI in the back-end, a docker mySQL container, front-end developed using HTML, CSS and JS without frameworks

#### This is a personal project that i made with the intention of learning the basics of JWT, authentication and authorization.
## To use this project you have to:
- Install poetry
```bash
$ pip install poetry
```
- Create a new poetry env
```bash
$ poetry env use python
```
- Use this new env
```bash
$ poetry shell
```
- Install the dependecies in the virtual environment
```bash
$ poetry install
```
- Change the .env.example to .env and change the value of the constants that are inside of it to what suits you more.
- Start up the database
```bash
$ sudo docker compose up
```
- Use alembic to create the table on the database
```bash
$ alembic upgrade head
```
- Start up the API using uvicorn
```bash
$ uvicorn src.server:app --reload
```
##### To see the frontend i recommend utilizing the extension "Live Server" no VSCode
