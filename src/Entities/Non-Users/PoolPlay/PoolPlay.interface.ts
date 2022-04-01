export default interface IPoolPlay {
    teams: {
        id: string
        score: number
        name: string
        thumbnail: string
    }[]
    pool: string
    date: string
    time?: string
    park?: string
    field?: string
    referees?: string[]
}
