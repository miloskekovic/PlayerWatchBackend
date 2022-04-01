import { StatsFields } from './../StatsFields.dto'
import { AverageStatsDto } from '../AverageFields.dto'

export interface IBaseball {
    velocity: StatsFields[] | StatsFields | AverageStatsDto
    spin_rate: StatsFields[] | StatsFields | AverageStatsDto
    exit_speed: StatsFields[] | StatsFields | AverageStatsDto
    pop_time: StatsFields[] | StatsFields | AverageStatsDto
    first_to_third: StatsFields[] | StatsFields | AverageStatsDto
    third_to_first: StatsFields[] | StatsFields | AverageStatsDto
    short_to_first: StatsFields[] | StatsFields | AverageStatsDto
    // home_to_second: StatsFields[] | StatsFields
    // longtoss: StatsFields[] | StatsFields
}
