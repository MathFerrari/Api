import 'dotenv/config';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const login = async (req, res) => {
    const email = process.env.EMAIL
    const password = process.env.PASSWORD

    if(!req.body.email) return res.status(422).json({ messageError: 'Email is required'})
    if(!req.body.password) return res.status(422).json({ messageError: 'Password is required'})

    if(email !== req.body.email || password !== req.body.password) return res.status(401).json({ messageError: 'Unauthorized'})

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({ id: 1 }, secret)

        res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Definir como seguro apenas em produção
            sameSite: 'strict',
            maxAge: 3600 * 24 * 7, // 1 hora
            path: '/',
        }));

        return res.status(200).send({ message: "Authentication completed successfully"})
    } catch (error) {
        res.status(500).json({ messageError: 'Internal Server Error' })
        console.log(error)
    }
}

