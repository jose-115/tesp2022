import { Request, Response } from 'express';
import { Produto } from '../models/Produtos';
import * as Yup from 'yup';

// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().required(),
    quantidadeEstoque: Yup.string().required(),
    preco: Yup.string().required(),
    precoPromocional: Yup.string().required(),
    precoPromoAtivado: Yup.string().required(),
    tipo: Yup.string().required(),

});
const deleteUserSchema = Yup.object().shape({
    nome: Yup.string().required(),
});

export default {
    async create(request: Request, response: Response) {
        const { nome, descricao, quantidadeEstoque, preco, precoPromocional, precoPromoAtivado, tipo } = request.body;

        if (
            !(await userSchema.isValid({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado,
                tipo,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Produto.findOne({ nome });
        if (!existing) {
            const user = await Produto.create({
                nome,
                descricao,
                quantidadeEstoque,
                preco,
                precoPromocional,
                precoPromoAtivado,
                tipo,
            });
            return response.status(200).json({
                message: 'Produto criado com sucesso',
                user,
            });
        }
        return response
            .status(201)
            .json({ message: 'Produto ja existe no BD' });
    },
    async index(request: Request, response: Response) {
        // atribui à existing
        // o retorno da chamada do método find
        // no modelo User
        const existing = await Produto.find();
        if (!existing) {
            return response
                .status(401)
                .json({ message: 'Nenhum Produto encontrado' });
        }
        return response.status(200).json(existing);
    },
    async update(request: Request, response: Response) {
        const { nome, tipo } = request.body;

        const user = await Produto.findOneAndUpdate(
            {
                nome,
            },
            {
                tipo,
            }
        );
        if (user) {
            return response.status(200).json({ message: 'Produto atualizado' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async findOne(request: Request, response: Response) {
        const { nome, tipo } = request.body;
        const user = await Produto.find({
            $or: [{ nome: nome }],
        });
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async delete(request: Request, response: Response) {
        const { nome } = request.body;

        if (!(await deleteUserSchema.isValid({ nome }))) {
            return response.status(401).json({ message: 'nome invalido' });
        }
        const result = await Produto.findOneAndDelete({ nome });
        if (result) {
            return response
                .status(200)
                .json({ message: 'Produto removido com sucesso' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
};
