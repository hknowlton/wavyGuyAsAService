const express = require('express');
const bodyParser = require('body-parser');
const { express: { port, parser } } = require('./config');
const { Team, Saying } = require('./config/sequelize')

const configure = async (app) => {
  app.use(bodyParser.urlencoded(parser.urlencoded));
  app.use(bodyParser.json(parser.json));
  app.get('/teams', async (req, res, next) => {
    const payload = await Team.findAll()
    const response = payload.map(d => d.toJSON())
    res.send(response)
  })
  app.get('/teams/:TeamId/sayings', async (req, res, next) => {
    const { TeamId } = req.params;
    const payload = await Saying.findAll({ where: { TeamId } })
    const response = payload.map(d => d.toJSON())
    res.send(response)
  })
  app.post('/teams/:TeamId/sayings', async (req, res, next) => {
    const { TeamId } = req.params;
    const { Message, Type } = req.body;
    const payload = await Saying.create({ TeamId, Name: Message, Type })
    const response = payload.toJSON()
    res.send(response)
  })
  return app;
};

const app = express();
configure(app)
  .then((configuredApp) => {
    configuredApp.listen(port, () => {
      console.info(`Express server listening on port ${port}...`);
    });
  })
  .catch((err) => {
    throw err;
  });

module.exports = app;
