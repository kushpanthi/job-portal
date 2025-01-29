// models/user.js
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // One-to-one relationship with Company
      User.hasMany(models.Company, { foreignKey: 'userid', onDelete: 'CASCADE' });
      User.hasMany(models.Application, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    }

    // Method to validate password during login
    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('JobSeeker', 'Employer'),
      allowNull: false,
    },
    validDocument: {
      type: DataTypes.STRING,
      allowNull: true, // Storing document paths
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hash password before saving
  

  return User;
};
