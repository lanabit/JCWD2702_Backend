import { NextFunction, Request, Response } from 'express';
import { findPassangersQuery } from '../services/PassangerService';

export const findPassangers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {Name, Survived, Pclass} = req.query as any
        if(!Name && !(Survived && Pclass)) throw {status: 404, message: 'Req Query Must Valid!'}

        const findPassangers = await findPassangersQuery({Name, Survived, Pclass})

        res.status(200).send({
            error: false, 
            message: 'Success', 
            data: findPassangers
        })
    } catch (error: any) {
        next(error)
    }
}