// IMPORT DATABASE SETUP
import { query } from '../utils/promisfy';

export const createLibrary = async({address, phone_number}: any) => {
    await query('INSERT INTO library_branch(address, phone_number) VALUES (?, ?)', [address, phone_number])
}

export const createLibraryAndStaffQuery = async({address, phone_number, name, email, password}: any) => {
    await query('START TRANSACTION')
    const createLibrary = await query('INSERT INTO library_branch(address, phone_number) VALUES (?, ?)', [address, phone_number])
    const createStaff = await query('INSERT INTO staffs(name, email, password, library_branch_id) VALUES (?, ?, ?, ?)', [name, email, password, createLibrary.insertId])
    await query('COMMIT')
}