import { Router } from 'express';
import { getProducts, getProductByCode, getAvailableProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.Controllers.js"

const router = Router();

router.get('/', getProducts)
router.get('/:id', getProductByCode)
router.get('/', getAvailableProducts)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


export default router