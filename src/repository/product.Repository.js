import product from "../models/product.model.js";

export const productRepository = {

    getAll: () => {
        return product.find();
    },

    getByCode: (code) => {
        return product.findOne({ code });
    },
    create: (newproduct) => {
        return product.create(newproduct);
    },

    update: (code, updates) => {
        return product.findOneAndUpdate({ code }, updates, { new: true });
    },

    delete: (code) => {
        return product.findOneIdAndDelete({ code });
    }
}