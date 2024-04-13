import 'dotenv/config'

import jwt from 'jsonwebtoken'

export function checkToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).json({ messageError: 'Unauthorized' })

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
        
    } catch (error) {
        return res.status(401).json({ messageError: 'Invalid token!' })
    }
}