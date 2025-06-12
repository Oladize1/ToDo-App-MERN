import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
    const token = jwt.sign({id: userId}, process.env.SECRET, {expiresIn: '30d'})
    return token
}

export const decodeToken = (req) =>  {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}