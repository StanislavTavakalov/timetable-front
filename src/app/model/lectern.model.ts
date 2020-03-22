import {Lecterntype} from './lecterntype.model';
import {Speciality} from './speciality.model';

export class Lectern {
	public id: string;
	public fullname: string;
	public name: string;
	public specialities: Speciality[];
}
