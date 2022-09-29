import { Request, Response } from 'express';
import { Produto } from '../models/Produtos';
import * as Yup from 'yup';

// yarn add yup @types/yup
const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    username: Yup.string().required(),
    phone: Yup.string().required(),

    address: Yup.object({
        street: Yup.string().required(),
        suite: Yup.string().required(),
        city: Yup.string().required(),
        zipcode: Yup.string().required(),
    }),
});
const deleteUserSchema = Yup.object().shape({
    email: Yup.string().email().required(),
});

export default {
    async create(request: Request, response: Response) {
        const { name, email, username, phone, address } = request.body;

        if (
            !(await userSchema.isValid({
                name,
                email,
                username,
                phone,
                address,
            }))
        ) {
            return response
                .status(401)
                .json({ message: 'dados fornecidos incorretamente' });
        }

        const existing = await Produto.findOne({ email });
        if (!existing) {
            const user = await Produto.create({
                name,
                email,
                username,
                phone,
                address,
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
        const { name, email, username } = request.body;

        const user = await Produto.findOneAndUpdate(
            {
                name,
            },
            {
                email,
                username,
            }
        );
        if (user) {
            return response.status(200).json({ message: 'Produto atualizado' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async findOne(request: Request, response: Response) {
        const { name, email, username } = request.body;
        const user = await Produto.find({
            $or: [{ name: name }, { email: email }, { username: username }],
        });
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
    async delete(request: Request, response: Response) {
        const { email } = request.body;

        if (!(await deleteUserSchema.isValid({ email }))) {
            return response.status(401).json({ message: 'email invalido' });
        }
        const result = await Produto.findOneAndDelete({ email });
        if (result) {
            return response
                .status(200)
                .json({ message: 'Produto removido com sucesso' });
        }
        return response.status(400).json({ message: 'Produto nao encontrado' });
    },
};
