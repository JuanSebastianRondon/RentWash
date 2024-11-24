import ProdModel from "../Models/ProductModel.js";

// Mostrar todos los productos
export const getAllProd = async (req, res) => {
    try {
        const products = await ProdModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            message: "Error al obtener los productos",
            error: error.message 
        });
    }
}

// Mostrar un producto por id
export const getProductById = async (req, res) => {
    try {
        const product = await ProdModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ 
            message: "Error al obtener el producto",
            error: error.message 
        });
    }
}

// Crear un producto
export const CreateProduct = async (req, res) => {
    try {
        const newProduct = await ProdModel.create(req.body);
        res.status(201).json({
            message: "Producto registrado exitosamente",
            product: newProduct
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }
}

// Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const result = await ProdModel.update(req.body, {
            where: { idProducto: req.params.id }
        });
        
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        // Obtener el producto actualizado
        const updatedProduct = await ProdModel.findByPk(req.params.id);
        res.status(200).json({
            message: "Producto actualizado exitosamente",
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
}

// Eliminar un Producto
export const deleteProduct = async (req, res) => {
    try {
        // Primero verificar si el producto existe
        const product = await ProdModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Si tiene una imagen, guardar la ruta para eliminarla después
        const imagePath = product.ruta_imagen;

        // Eliminar el producto
        await product.destroy();

        // Si había una imagen, eliminarla del sistema de archivos
        if (imagePath) {
            try {
                const fs = await import('fs');
                const path = await import('path');
                const fullPath = path.join(process.cwd(), 'public', imagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            } catch (fsError) {
                console.error('Error al eliminar archivo de imagen:', fsError);
                // No devolvemos error aquí porque el producto ya fue eliminado
            }
        }

        res.status(200).json({ 
            message: "Producto eliminado correctamente",
            deletedId: req.params.id
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({
            message: "Error al eliminar el producto",
            error: error.message
        });
    }
}