import 'dotenv/config'

import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export function checkToken (req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.auth

    if(!token) return res.status(401).json({ messageError: 'Unauthorized' })

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
        
    } catch (error) {
        return res.status(401).json({ messageError: 'Invalid token!' })
    }
}