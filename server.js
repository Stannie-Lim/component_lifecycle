const path = require('path');
const Sequelize = require('sequelize');
const express = require('express');

const { STRING } = Sequelize.DataTypes;

const db = new Sequelize('postgres://localhost/acme_db');
const Category = db.define('category', {
  name: STRING,
});

const Thing = db.define('thing', {
  name: STRING,
});

Category.hasMany(Thing);
Thing.belongsTo(Category);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const categories = Array(4).fill().map((_, index) => `category${index + 1}`);
    const things = Array(4).fill().map((_, index) => `thing${index + 1}`);

    const createdCategories = await Promise.all(
      categories.map(name => Category.create({ name }))
    );

    await Promise.all(
      things.map(name => Thing.create({ name, categoryId: createdCategories[Math.floor(Math.random() * createdCategories.length)].id }))
    );

  } catch (error) {
    console.log(error);
  }
};

const app = express();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', async (req, res, next) => {
  res.send(await Thing.findAll({ include: Category }));
});

app.get('/api/categories', async (req, res, next) => {
  res.send(await Category.findAll({ include: Thing }));
});

app.get('/api/things/:id', async (req, res, next) => {
  res.send(await Thing.findByPk(req.params.id, { include: Category }));
});

app.get('/api/categories/:id', async (req, res, next) => {
  res.send(await Category.findByPk(req.params.id, { include: Thing }));
});

syncAndSeed()
.then(() => app.listen(3000));
