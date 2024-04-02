// IMPORT CONNECTION & SETUP PROMISFY
import db from '../../connection';
import util from 'util';
const query: any = util.promisify(db.query).bind(db);
import { IfindPassangersQuery } from './types';

export const findPassangersQuery = async({Name, Survived, Pclass}: IfindPassangersQuery) => {
    if(Name) return await query('SELECT * FROM passangers WHERE Name LIKE ?', [`%${Name}%`])
    if(Survived && Pclass) return await query('SELECT * FROM passangers WHERE Survived = ? AND Pclass = ?', [Survived, Pclass])
}