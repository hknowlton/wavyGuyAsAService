module.exports = (sequelize, DataTypes) => {
  const fields = {
    SayingId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    TeamId: {
      references: {
        model: 'Team',
        key: 'TeamId',
      },
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    Name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Type: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  };

  const Model = sequelize.define('Saying', fields);

  Model.associate = (models) => {
    models.Saying.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false,
        name: 'TeamId',
      },
    });
  };

  return Model;
};
