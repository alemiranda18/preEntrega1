import { hashSync } from 'bcrypt';
import { userRepository } from '../repository/user.Repository.js';
import { USER_ROLES } from '../utils/constants.js';
import { hashPassword } from '../utils/hashed.js';

export const userService = {
    getUsers: async () => {
        const users = await userRepository.getAll();
        return users;
    },

    getUserById: async (id) => {
        const user = await userRepository.getByid(id);

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return user;
    },

    createUser: async (newUser) => {
        const { firstName, lastName, email, password, role = "user" } = newUser;
        if (!firstName || !lastName || !email || !password) {
            const error = new Error('Faltan campos obligatorios');
            error.statusCode = 400;
            throw error;
        }

        //falta comprobar si role tiene un valor valido
        if (!Object.values(USER_ROLES).includes(role)) {
            const error = new Error('Rol invalido');
            error.statusCode = 400;
            throw error;
        }

        const existing = await userRepository.getByEmail(email);
        if (existing) {
            const error = new Error('Email ocupado');
            error.statusCode = 400;
            throw error;
        }
        const hashed = await hashPassword(password)

        return userRepository.create({ firstName, lastName, email, password: hashed, role });
    },

    updateUser: async (id, updates) => {
        if (updates.email) {
            const existingUser = userRepository.getByEmail(updates.email)
            if (updates.email && existingUser._id.toString() !== id) {
                const error = new Error('El email ya está en uso por otro usuario');
                error.statusCode = 400;
                throw error;
            }
        }

        if (updates.password) {
            updates.password = await hashPassword(updates.password)
        }

        const user = await userRepository.update(id, updates);

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return user;
    },

    deleteUser: async (id) => {
        const user = await userRepository.delete(id);

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return user;
    }
};