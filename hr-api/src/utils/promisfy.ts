import db from '../connection';
import util from 'util';
export const query: any = util.promisify(db.query).bind(db);