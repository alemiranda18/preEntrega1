import { productRepository } from '../repository/product.Repository.js';
import { PRODUCT_STATUS } from '../utils/constants.js';

export const productService = {
    getProducts: async () => {
        const products = await productRepository.getAll();
        return products;
    },
    getProductByCode: async (code) => {
        const product = await productRepository.getByCode(code);

        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return product;
    },
    getAvailableProducts: async () => {
        const allProducts = await productRepository.getAll();
        const productAvailable = allProducts.filter((product) => product.status !== PRODUCT_STATUS.OUT_OF_STOCK);
        return productAvailable

    },
    createProduct: async (productData) => {
        const { title, description, code, price, stock, category, status } = productData;
        if (!title || !code || !price || stock === undefined || !category || !status) {
            const error = new Error('Faltan campos obligatorios');
            error.statusCode = 400;
            throw error;
        }

        const existing = await productRepository.getByCode(code);
        if (existing) {
            const error = new Error('El código del producto ya está en uso');
            error.statusCode = 400;
            throw error;
        }
        return productRepository.create({ title, description, code, price, stock, category, status });
    },

    updateProduct: async (code, updates) => {
        const product = await productRepository.update(code, updates);

        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return product;
    },

    deleteProduct: async (code) => {
        const product = await productRepository.delete(code);

        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return product;
    }
};