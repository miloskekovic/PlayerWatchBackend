export default interface IField {
    name: string
    description?: string
    has_seating: boolean
    has_shade: boolean
    is_turf: boolean
    pictures: string[]
    electricity: boolean
    sports: string[]
    spikes: boolean
    is_indoor: boolean
    size: string
    highschool_compatible: boolean
}
