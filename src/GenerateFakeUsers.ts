import * as faker from 'faker'

/* eslint-disable @typescript-eslint/no-explicit-any */
const randomUser = () => {
    return {
        firebase_id: faker.random.uuid(),
        email: faker.internet.email(),
        personal: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
        },
    }
}

const generatePlayers = (userCount = 500): Array<any> => {
    const myPlayers = []
    const sports = ['Football', 'Baseball', 'Softball', 'Basketball', 'Volleyball', 'Tennis', 'Track', 'Soccer']
    const footballPos = [
        'Quarterback',
        'Halfback',
        'Fullback',
        'Center',
        'Guard-Left',
        'Guard-Right',
        'Tackle-Left',
        'Tackle-Right',
        'Wide Receiver',
        'Tight End',
        'Defensive Tackle',
        'Defensive End',
        'Middle Linebacker',
        'Outside Linebacker',
        'Cornerback',
        'Safety',
        'Nickelback',
        'Kicker',
        'Holder',
        'Long Snapper',
        'Punter',
        'Kickoff Specialist',
        'Punt Returner',
        'Gunner',
        'Jammer',
    ]
    const baseballPositions = [
        'Pitcher',
        'Catcher',
        'First Base',
        'Second Base',
        'Third Base',
        'Right Field',
        'Center Field',
        'Left Field',
    ]
    const softballPositions = [
        'Pitcher',
        'Catcher',
        'First Base',
        'Second Base',
        'Third Base',
        'Right Field',
        'Center Field',
        'Left Field',
    ]
    const basketballPositions = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center']
    const volleyballPositions = ['Outside Hitter', 'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist']
    const tennisPositions = ['Double', 'Single']
    const trackPositions = ['Short Distance', 'Middle Distance', 'Long Distance', 'Hurdles', 'Relays']
    const soccerPositions = [
        'Goalkeeper',
        'Full-Back',
        'Sweeper',
        'Wing-Back',
        'Centre Back',
        'Sweeper',
        'Central Midfield',
        'Outside Midfield',
        'Centre Forward',
        'Attacking Midfield',
        'Defending Midfield',
    ]
    const allSports = [
        footballPos,
        baseballPositions,
        softballPositions,
        basketballPositions,
        volleyballPositions,
        tennisPositions,
        trackPositions,
        soccerPositions,
    ]
    const createPlayerObj = () => {
        const randomSport = faker.random.arrayElement(sports)
        const sportIndex = sports.indexOf(randomSport)
        const randomPosition = faker.random.arrayElement(allSports[sportIndex])
        return {
            ...randomUser(),
            sport_info: {
                position: randomPosition,
                sport: randomSport,
            },
        }
    }
    for (let i = 0; i < userCount; i++) {
        myPlayers.push(createPlayerObj())
    }
    return myPlayers
}

const generateCoaches = (userCount = 500): Array<any> => {
    const myPlayers = []
    const sports = ['Football', 'Baseball', 'Softball', 'Basketball', 'Volleyball', 'Tennis', 'Track', 'Soccer']
    const coachTypes = ['High School Coach', 'College Coach', 'Select Ball Coach']
    for (let i = 0; i < userCount; i++) {
        myPlayers.push({
            ...randomUser(),
            sport_info: {
                sport: faker.random.arrayElement(sports),
                coach_type: faker.random.arrayElement(coachTypes),
            },
        })
    }
    return myPlayers
}

const generateSpectators = (userCount = 500): Array<any> => {
    const myPlayers = []
    for (let i = 0; i < userCount; i++) {
        myPlayers.push({
            ...randomUser(),
        })
    }
    return myPlayers
}

const generateDirectors = (userCount = 500): Array<any> => {
    const myPlayers = []
    for (let i = 0; i < userCount; i++) {
        myPlayers.push({
            ...randomUser(),
        })
    }
    return myPlayers
}

export { generatePlayers, generateCoaches, generateSpectators, generateDirectors }
