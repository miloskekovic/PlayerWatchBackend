/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// const userInfo = {
//     firebase_id: 'coachfirebaseID',
//     email: 'somecoachemail@gmail.com',
//     personal: {
//         first_name: 'TestCoachF',
//         last_name: 'TestCoachL'
//     },
//     sport_info: {
//         sport: 'Football',
//         coach_type: 'Select'
//     },
//     school_district: 'Flour Bluff ISD',
//     school: 'Flour Bluff',
//     school_type: 'High School'
// };

// let conn: any;
// beforeAll(async () => {
//     conn = await testConn();
// });
// afterAll(async () => {
//     // await conn.connection.db.dropDatabase();
//     await conn.connection.close();
// });

// const createCoach = `
// mutation{
//     createCoach(
//         firebase_id: "${userInfo.firebase_id}"
//         email: "${userInfo.email}"
//         personal: {
//             first_name: "${userInfo.personal.first_name}"
//             last_name: "${userInfo.personal.last_name}"
//         }
//         sport_info: {
//             sport: "${userInfo.sport_info.sport}"
//             coach_type: "${userInfo.sport_info.coach_type}"
//         }
//         school_info: {
//             school_district: "${userInfo.school_district}"
//             school: "${userInfo.school}"
//             school_type: "${userInfo.school_type}"
//         }

//     )
//   }
// `;

// describe('CreateCoach', () => {
//     it('create user', async () => {
//         const res = await gCall({
//             source: createCoach
//         });
//         expect(JSON.stringify(res)).toContain('true');
//         const dbUser = await Coach.findOne({ email: userInfo.email });
//         expect(JSON.stringify(dbUser)).toContain('user_type');
//     });
// });
