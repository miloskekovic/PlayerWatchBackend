// import jwt from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken'

export const CreateToken = (): string => {
    const signed = jwt.sign(
        { email: '213@gmail', _id: '1231241241241124', userType: 'Test' },
        process.env.SECRET_JWT_KEY,
        { expiresIn: 60 }
    )
    console.log({ signed })
    return signed
}
