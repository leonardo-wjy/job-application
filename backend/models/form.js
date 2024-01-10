"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  form.init(
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
      posisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat_tanggal_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      golongan_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat_tinggal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orang_terdekat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bersedia_penempatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penghasilan_harapan: {
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
      }
    },
    {
      sequelize,
      modelName: "form",
      tableName: "form",
      timestamps: false
    }
  );
  return form;
};
