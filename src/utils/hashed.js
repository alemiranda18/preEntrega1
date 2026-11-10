import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const compareHash = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

