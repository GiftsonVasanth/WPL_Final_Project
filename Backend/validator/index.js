exports.userSignupValidator = (req, res, next) => {
    console.log('Request :', req.body.password)
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Enter a valid email address').isEmail()
    req.check('password', 'Password is required').notEmpty();
    req.check('password').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')

    req.check('password')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}$/)
        .withMessage('Password should contain one number, capital letter, small letter and a special character')

    req.check('password')
        .matches(req.body.confirmpassword)
        .withMessage('Passwords should match')

    const errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
