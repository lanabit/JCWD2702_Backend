import { Request, Response } from 'express';
import { createLibrary, createLibraryAndStaffQuery } from './../services/LibraryService';
// IMPORT DATABASE SETUP
import { query } from '../utils/promisfy';

export const create = async(req: Request, res: Response): Promise<void> => {
    try {
        const {address, phone_number} = req.body

        await createLibrary({address, phone_number})

        res.send({
            error: false, 
            message: 'Create Library Success', 
            data: {}
        })

    } catch (error) {
        // await query('ROLLBACK')
        console.log(error)
    }
}



// ROLLBACK TRANSACTION
// UNDO APABILA TERJADI ERROR KETIKA MODIFIKASI DATA KE LEBIH DARI 1 TABEL
export const createLibraryAndStaff = async(req: Request, res: Response) => {
    try {
        // POSTMAN: library->address, phone_number; staff: name, email, password
        const {address, phone_number, name, email, password} = req.body 

        await createLibraryAndStaffQuery({address, phone_number, name, email, password})
    } catch (error) {
        await query('ROLLBACK')
        console.log(error)
    }
}