export const useDataLoader = async (schema, ids = [], lean = true, specialKey = '_id'): Promise<any[]> => {
    const foundDocs = await schema.find({ [specialKey]: { $in: ids } }).lean(lean)
    return ids.map((id) => foundDocs.find((document) => document[specialKey].toString() == id))
}
