import dotenv from "dotenv"

dotenv.config()
dotenv.config({ path: '.env.example' })

const validated = ["PORT", "MONGODB_URI", "NODE_ENV"]

const allExist = validated.every((varName) => process.env[varName])

if (!allExist) {
    throw new Error('Faltan variables de entorno obligatorias: PORT, MONGODB_URI y NODE_ENV')
}

export const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    isProd: process.env.NODE_ENV === "production",
    mongoDbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
}
