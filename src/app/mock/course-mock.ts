import {Course} from '../model/course.model';
import {Schedule} from '../model/shedule.model';
import {Week} from '../model/week.model';


export const WEEKS: Week[] = [{id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 2, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null},
    {id: null, colspan: 1, occupation: null}
    ]
	;

/*export const COURSES: Course[] = [{
  id: 100,
  name: '1',
  weeks: [{id: 99, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 101, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 102, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 103, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 104, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 105, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 106, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 107, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 108, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 109, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 110, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 111, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 112, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 113, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 114, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 115, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 116, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 117, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 118, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 119, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 120, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 121, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 122, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 123, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 124, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 125, colspan: 2, occupation: OCCUPATIONS[0] },

    {id: 126, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 127, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 128, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 129, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 130, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 131, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 132, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 133, colspan: 1, occupation: OCCUPATIONS[0]},

    {id: 134, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 135, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 136, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 137, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 138, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 139, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 140, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 141, colspan: 1, occupation: OCCUPATIONS[0]},

    {id: 142, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 143, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 144, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 145, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 146, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 147, colspan: 2, occupation: OCCUPATIONS[0]},
    {id: 148, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 149, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 150, colspan: 1, occupation: OCCUPATIONS[0]},
    {id: 151, colspan: 1, occupation: OCCUPATIONS[0]},

    ], countOccupation: OCCUPATION_COUNTERS, total: 52
},
  {
    id: 200,
    name: '2',
    weeks: [{id: 199, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 201,  colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 202, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 203, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 204, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 205, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 206, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 207, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 208, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 209, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 210, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 211, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 212, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 213, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 214, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 215, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 216, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 217, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 218, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 219, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 220, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 221, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 222, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 223, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 224, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 225, colspan: 2, occupation: OCCUPATIONS[0]},

      {id: 226, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 227, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 228, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 229, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 230, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 231, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 232, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 233, colspan: 1, occupation: OCCUPATIONS[0]},

      {id: 234, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 235, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 236, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 237, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 238, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 239, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 240, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 241, colspan: 1, occupation: OCCUPATIONS[0]},

      {id: 242, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 243, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 244, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 245, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 246, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 247, colspan: 2, occupation: OCCUPATIONS[0]},
      {id: 248, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 249, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 250, colspan: 1, occupation: OCCUPATIONS[0]},
      {id: 251, colspan: 1, occupation: OCCUPATIONS[0]},

    ], countOccupation: OCCUPATION_COUNTERS_1, total: 52
  }
  ];

export const SCHEDULE: Schedule = {
  id: 1, courses: COURSES, countOccupation: OCCUPATION_COUNTERS1
};*/
