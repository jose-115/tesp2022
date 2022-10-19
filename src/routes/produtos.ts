/**
 * /new para criar um novo uproduto
 * /list para listar todos os produtos
 */
import express from 'express';
import ProdutoController from '../controllers/ProdutoControllers';
const produtoRoutes = express.Router();

produtoRoutes.post('/produto/new', ProdutoController.create);
produtoRoutes.put('/produto/update', ProdutoController.update);
produtoRoutes.get('/produto/list', ProdutoController.index);
produtoRoutes.get('/produto/list/:_id', ProdutoController.findOne);
produtoRoutes.post('/produto/del/:_id', ProdutoController.delete);

export default produtoRoutes;
