const validator = require('../helpers/validate');

const savePokemon = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    type: 'required|string',
    number: 'required|string',
    color: 'required|string',
    evolution: 'string',
    img: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePokemon 
};