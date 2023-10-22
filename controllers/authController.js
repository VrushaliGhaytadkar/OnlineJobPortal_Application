import userModel from "../models/userModel.js";


export const registerController = async (req, res, next) => {

    const { name, email, password, lastName } = req.body

    //validate
    if (!name) {
        next('please provide name');
    }

    if (!email) {
        next('please provide email');
    }

    if (!password) {
        next('please provide passoword');
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        next('Email already Register please login');
    }

    const user = await userModel.create({ name, email, password, lastName });
    const token = user.createJWT();

    return res.status(201).send({
        success: true,
        message: "User Created Successfully",
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token
    })


}

export const loginController = async (req, res, next) => {
    const { email, password } = req.body

    //validation
    if (!email || !password) {
        next('Please provide all fields')
    }

    //find user by email
    const user = await userModel.findOne({ email })
    if (!user) {
        next('Invalid Username or Password')
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid Username or Password')
    }

    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: 'Login Successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token,
    })
}

