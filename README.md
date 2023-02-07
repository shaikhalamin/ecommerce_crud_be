## Ecommerce Crud Backend API

## Installation

```bash

$ git clone https://github.com/shaikhalamin/ecommerce_crud_be.git

$ cp .env.example .env

$ npm install
```

## Running the app

```bash
# development
$ npm run dev

```

## Migration Run Command

Create Base Migration If Base migrations doesn't exist

N:B if you want to add tables for your base migrations then create your entity classes for initial migrations

```javascript

npm run migration:generate -- db/migrations/BaseMigrations

```

Run Base Migration 

```javascript

npm run migration:run

```

## Creating new migration

First create a TypeOrm entity class Like User with property like name,phone password property then run the below command


```javascript

npm run migration:generate -- db/migrations/2023_01_26_CreateCategoryTable

```

## Altering existing table

Add the corresponding property to the entity table, let's suppose you want to add new column in users table the add the property in the user entity class, TypeOrm will automatically detect the new field if you run the below command

```javascript

npm run migration:generate -- db/migrations/2023_01_26_AlterCategoryTable

```

## Migration Run command for new create or alter table

```javascript

npm run migration:run

```
# ecommerce_crud_fe
