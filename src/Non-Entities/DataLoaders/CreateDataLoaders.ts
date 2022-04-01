import DataLoader = require('dataloader')
import { useDataLoader } from '../../Loaders'

export default function createDataLoaders(schema, specialKey?: string) {
    return {
        dataLoader: new DataLoader((keys) => useDataLoader(schema, keys, false, specialKey)),
        leanDataLoader: new DataLoader((keys) => useDataLoader(schema, keys, true, specialKey)),
    }
}
