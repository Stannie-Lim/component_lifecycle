1. createdb acme_db
2. npm i
3. npm run start:dev

# Endpoints
- GET `/api/things` shows all the things + the category that it belongs to
- GET `/api/categories` shows all the categories + the things that it has
- GET `/api/things/:id` shows one thing based on their primary key + the category that it belongs to
- GET `/api/categories/:id` shows one category based on their primary key + the things that it has

# Relationships
- Thing has many Category
- Category belongs to Thing
