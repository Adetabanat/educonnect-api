// Noah Ruppe created this page

const validator = require('../helpers/validate');
const saveUser = async (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|string|min:6',
        phoneNumber: 'required|string',
        role: 'required|string',
        address: 'required|string'
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};





module.exports = {
    saveUser,
};