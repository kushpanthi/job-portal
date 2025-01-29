'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
  });

  Application.associate = function (models) {
    Application.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE'});
    Application.belongsTo(models.Job, { foreignKey: 'jobId',onDelete: 'CASCADE' });
  };

  return Application;
};
