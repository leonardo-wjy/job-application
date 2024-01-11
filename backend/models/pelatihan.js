"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pelatihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pelatihan.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sertifikat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tahun: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "pelatihan",
      tableName: "pelatihan",
      timestamps: false
    }
  );
  return pelatihan;
};
