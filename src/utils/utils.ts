import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}


const generateToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


export { hashPassword, generateToken }