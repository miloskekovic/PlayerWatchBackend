/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'reflect-metadata'

import * as mongoose from 'mongoose'

export const testConn = async () => {
    // eslint-disable-next-line no-undef
    return await mongoose.connect(
        'mongodb+srv://Adam:YBL1IqHy2pahKlnm@cluster0-ktt9i.gcp.mongodb.net/what?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
}
