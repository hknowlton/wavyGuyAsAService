module.exports = (sequelize, DataTypes) => {
  const fields = {
    TeamId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  };

  const Model = sequelize.define('Team', fields);

  Model.associate = (models) => {
    models.Team.hasMany(models.Saying, {
      foreignKey: {
        allowNull: false,
        name: 'TeamId',
      },
    });
  };

  return Model;
};
