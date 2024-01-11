"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pendidikan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pendidikan.init(
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
      jenjang_pendidikan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institusi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tahun_lulus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ipk: {
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
      modelName: "pendidikan",
      tableName: "pendidikan",
      timestamps: false
    }
  );
  return pendidikan;
};
