const { database } = require('../database');
require('../datas/models/products')

database.sync({ alter: true });