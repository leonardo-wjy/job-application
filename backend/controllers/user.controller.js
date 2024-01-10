const { user } = require("../models");
// const gHelper = require("../helpers/global.helper");
const gHelper = require("../helpers/global.helper");
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");
var crypto = require('crypto');
const moment = require("moment");
moment.locale("id");

//login user
const Login = async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
      // next(`Validation error: ${error.details.map(x => x.message).join(", ")}`);
    } else {
      const { email, password } = value;
      try {
        let users = await user.findOne({
          where: {
            email: email,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          raw: true,
        });
        const verifyPassword = crypto.createHash('md5').update(password).digest('hex');
        // const verifyPassword = await bcrypt.compare(password, users.password);
        if (!users) {
          res.status(406).send({
            status: false,
            message: "Can't get your infomation detail",
          });
        } else if (verifyPassword !== users.password) {
          res.status(401).send({
            status: false,
            message: "Can't Verify your account with email or Password",
          });
        } else {
          const token = jwt.sign(
            {
              email: users.email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );


          //update logtime last login
          const update = await user.update({logtime: moment().format('YYYY-MM-DD HH:mm:ss')}, 
            { where: {id: users.id} }
          );
          
          users.logtime = moment().format('YYYY-MM-DD HH:mm:ss');

          let dataLogin = {
            token: token,
            ...users,
          };
          res.status(200).send({
            status: true,
            message: "Success Login",
            data: dataLogin,
          });
        }
      } catch (error) {
        return res.status(406).send({
          status: false,
          message: "Error When Login",
          errorDetail: error.message,
        });
      }
    }
};

//Register User
const Register = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
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
    // next(`Validation error: ${error.details.map(x => x.message).join(", ")}`);
  } else {
    const { email, password } = value;
    try {
      let find_email = await user.findAll({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      });
      const verifyPassword = crypto.createHash('md5').update(password).digest('hex');
      // const verifyPassword = await bcrypt.compare(password, users.password);

      value.password = verifyPassword;
      value.role = 'User';
      value.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      value.updatedAt = moment().format('0000-00-00 00:00:00');

      if (find_email.length === 0) {
        await user.create(
          value
        );

        res.status(200).send({
          status: true,
          message: 'Success Create Account'
        });
      } else {
        res.status(409).send({
          status: false,
          message: "email already used",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Error When Register",
        errorDetail: error.message,
      });
    }
  }
};

module.exports = {
    Login,
    Register
  };
  