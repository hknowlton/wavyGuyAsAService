const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { express: { port, parser } } = require('./config');
const { Team, Saying } = require('./config/sequelize')

const configure = async (app) => {
  app.use(bodyParser.urlencoded(parser.urlencoded));
  app.use(bodyParser.json(parser.json));

  app.use(cors('*'))

  app.get('/teams', async (req, res, next) => {
    const payload = await Team.findAll()
    const response = payload.map(d => d.toJSON())
    res.send(response)
  });

  app.get('/teams/:TeamName/sayings', async (req, res, next) => {
    const { TeamName } = req.params;
    const payload = await Saying.findAll({ iniclude: { model: Team, where: { Name: TeamName } } });
    const response = payload.map(d => d.toJSON())
    const renderResponse = response.reduce((renderedObj, res) => {
      switch (res.Type) {
        case 1:
          renderedObj.Success.push(res.Name)
          break;
        case 2:
          renderedObj.Failure.push(res.Name)
          break;
        default:
          break;
      }
      return renderedObj;
    }, { Success: [], Failure: [] })
    res.send(renderResponse)
  });

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
