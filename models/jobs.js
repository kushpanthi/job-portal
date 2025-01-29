// models/job.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // Associate Job with Company
      Job.belongsTo(models.Company, { foreignKey: 'companyId' });
      Job.hasMany(models.Application, { foreignKey: 'jobId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }

  Job.init({
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobType: {
      type: DataTypes.ENUM('Part-time', 'Full-time'),
      allowNull: false,
    },
    postingDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'companyId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Job',
  });

  return Job;
};
