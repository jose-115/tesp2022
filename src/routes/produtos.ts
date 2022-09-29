/**
 * /new para criar um novo uproduto
 * /list para listar todos os produtos
 */
import express from 'express';
import ProdutoController from '../controllers/ProdutoControllers';
const produtoRoutes = express.Router();

produtoRoutes.post('/new', ProdutoController.create);
produtoRoutes.put('/update', ProdutoController.update);
produtoRoutes.get('/list', ProdutoController.index);
produtoRoutes.post('/find', ProdutoController.findOne);
produtoRoutes.post('/delete', ProdutoController.delete);

export default produtoRoutes;
