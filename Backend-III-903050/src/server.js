import { config } from "./config/env.config.js";
import { connectDb } from "./config/db.connect.js"
import app from "./app.js"

const PORT = config.port

const main = async () => {
    try {
        await connectDb()

        app.listen(PORT, () => {
            console.log("Servidor corriendo en el puerto " + PORT)
        })
    } catch (error) {
        console.error("No es posible conectar con la base de datos:", error)
        process.exit(1)
    }

}

main()