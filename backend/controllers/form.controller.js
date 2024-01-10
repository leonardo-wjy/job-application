const { form, user } = require("../models");
// const gHelper = require("../helpers/global.helper");
const gHelper = require("../helpers/global.helper");
const Joi = require("joi");
require("dotenv").config();
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');
const moment = require("moment");
moment.locale("id");

//get all form user
const getAll = async (req, res) => {
  const {
    query: { search, searchType, currentPage, pageSize, sort, sortType },
  } = req;

  const arrSort = {
    createdAt: "createdAt"
  };
  const arrSortType = { asc: "ASC", desc: "DESC" };

  const querySort = arrSort[sort] || arrSort.createdAt;
  const querySortType = arrSortType[sortType] || arrSortType.desc;
  const limit = Number(pageSize) || 10;
  const current_Page = currentPage || 1;
  const offset = (current_Page - 1) * limit;

  try {
    let condition = {};
    if (search) {
      condition = {
          [Op.or]: [
              {
                  nama: { [Op.substring]: search },
              },
              {
                  posisi: { [Op.substring]: search },
              },
          ]
      } 
    Object.assign(condition);
  }

    const data = await form.findAll({
      where: condition,
      order: [[querySort, querySortType]],
      offset: offset,
      limit: limit,
    });

    const totalData = await form.count({
      where: condition,
      col: "id",
    });

    const meta = {
      currentPage: Number(current_Page),
      pageCount: gHelper.totalPage(totalData, limit),
      pageSize: limit,
    };

    res.status(200).send({
      status: true,
      message: "Success Getting Form",
      data: data,
      meta: meta,
    });
  } catch (error) {
    return res.status(404).send({
      status: false,
      message: error.message,
    });
  }
};

//Save Form User
const Save = async (req, res) => {
  const schema = Joi.object({
    posisi: Joi.string().max(255).required(),
    nama: Joi.string().max(255).required(),
    no_ktp: Joi.string().length(16).required(),
    tempat_tanggal_lahir: Joi.string().max(255).required(),
    agama: Joi.string().required(),
    golongan_darah: Joi.string().required(),
    status: Joi.string().required(),
    alamat_ktp: Joi.string().required(),
    alamat_tinggal: Joi.string().required(),
    email: Joi.string().email().required(),
    no_telp: Joi.string().max(255).required(),
    orang_terdekat: Joi.string().max(255).required(),
    skill: Joi.string().required(),
    bersedia_penempatan: Joi.string().required(),
    penghasilan_harapan: Joi.string().max(20).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);


  if (error) {
    // on fail return comma separated errors
    res.status(400).send({
      status: false,
      message: gHelper.removeString(error.details[0].message),
    });
  } else {
    try {
      let users = await user.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });

      if(users)
      {
        let find_form = await form.findAll({
          where: {
            user_id: req.params.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          raw: true,
        });
  
        value.user_id = req.params.id;
        value.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  
        if (find_form.length === 0) {
          value.updatedAt = moment().format('0000-00-00 00:00:00');

          // create
          await form.create(
            value
          );
  
          res.status(200).send({
            status: true,
            message: 'Save Successfully'
          });
        } else {
          value.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

          // update
          await form.update(value, 
              { where: {user_id: req.params.id} }
          );
          res.status(200).send({
            status: true,
            message: 'Save Successfully'
          });
        }
      }
      else
      {
        return res.status(406).send({
          status: false,
          message: "Error, user not Found"
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Error When Save",
        errorDetail: error.message,
      });
    }
  }
};

//get by id user
const getById = async (req, res) => {

  try {
    let condition = {};

    condition = Object.assign(condition, { user_id: req.params.id });

    const data = await form.findOne({
      where: condition,
    });

    if(data)
    {
      res.status(200).send({
        status: true,
        message: "Success Getting form",
        data : data,
      });
    }
    else
    {
      res.status(400).send({
        status: false,
        message: "form not found",
      });
    }
  } catch (error) {
    return res.status(404).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
    getById,
    Save,
    getAll
};
  