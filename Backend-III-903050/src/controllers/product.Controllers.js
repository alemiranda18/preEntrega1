import { productService } from '../services/product.Service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).json({ status: 'success', payload: products })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
};

export const getProductByCode = async (req, res) => {
    try {
        const { code } = req.params
        const product = await productService.getProductByCode(code);
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
};
export const getAvailableProducts = async (req, res) => {
    try {
        const productAvailable = await productService.getAvailableProducts()
        return res.status(200).json({ status: 'success', payload: productAvailable })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { code } = req.params
        const updates = req.body
        const product = await productService.updateProduct(code, updates);
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { code } = req.params
        const product = await productService.deleteProduct(code);
        return res.status(200).json({ status: 'success', payload: product })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Error del servidor'
        });
    }
}