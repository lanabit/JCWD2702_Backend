import express, { Express, Request, Response } from 'express';
import { ReadFile, WriteFile } from './utils/fs';

const app: Express = express();
// Body Parser: Mengambil Req.Body dari client
app.use(express.json())
const port = 5000;

import { IUser, IUserJSON } from './types';

// Register
app.post('/register', (req: Request, res: Response) => {
    try {
        // Step01. Get Data from Req.Body
        const userBody: IUser = req.body
        
        // Step02. Manipulation
        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users
        const findUser = usersJSON.filter((val: IUser) => 
            val.username === userBody.username || val.email === userBody.email
        )
        
        if(findUser.length > 0) return res.send('Email or Username Already Registered!')

        const uid = Date.now()

        usersJSON.push({uid, ...userBody})

        WriteFile(db)

        // Step03. Send Response
        res.send({
            uid, 
            username: userBody.username, 
            email: userBody.email
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/auth', (req: Request, res: Response) => {
    try {
        const { username, password } = req.body 

        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users

        const findUser: IUserJSON[] = usersJSON.filter(val => 
            (val.username === username || val.email === username) 
            && val.password === password) // [{}]
        
        if(findUser.length === 0) throw new Error('Username & Password Incorrect!')

        return res.send({
            uid: findUser[0].uid, 
            username: findUser[0].username, 
            role: findUser[0].role
        })
    } catch (error: any) {
        res.send(error.message)
    }
})

app.post('/transactions', (req: Request, res: Response) => {
    try {
        const { usersid} = req.headers as { usersid: string }
        const { moviesId, time, total_seat, date }: 
        { moviesId: number, time: string, total_seat: number, date: string } 
        = req.body

        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users
        const moviesJSON: any[] = db.movies
        const transactionJSON: any[] = db.transactions

        const findUser = usersJSON.some(val => val.uid === Number(usersid))
        
        if(!findUser) return res.send(`UsersId ${usersid} Not Found!`)

        const findMovie = moviesJSON.filter(val => val.id === moviesId && val.show_times.includes(time) && val.release_date < date)

        if(findMovie.length === 0) throw new Error('Movie Not Found')

        let bookSeat = 0
        transactionJSON.map(val => {
            if(val.moviesId === moviesId && val.time === time && val.date === date) bookSeat += val.total_seat
        })

        let availableSeat = findMovie[0].total_seat - bookSeat
        if(availableSeat < total_seat) throw new Error('Seat Not Available!')

        // Validation Weekdays/Weekend
        const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6? true : false
        let totalPrice = 0
        if(isWeekend){
            totalPrice = findMovie[0].price[0].weekend * Number(total_seat)
        }else{
            totalPrice = findMovie[0].price[0].weekdays * Number(total_seat)
        }

        transactionJSON.push({
            ...req.body
        })

        WriteFile(db)

        res.send({
            ...req.body, 
            price: totalPrice
        })
    } catch (error: any) {
        res.send(error.message)
    }
})

app.post('/admin/movies', (req: Request, res: Response) => {
    try {
        const { usersid } = req.headers as { usersid: string }

        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users
        const moviesJSON: any[] = db.movies

        const findUser = usersJSON.filter(val => val.uid === Number(usersid))
        
        if(findUser[0].role !== 'admin') throw new Error('Authorization Failed! Only Admin Can Create Movie!')
        
        moviesJSON.push({
            id: moviesJSON.length === 0? 1 : moviesJSON[moviesJSON.length-1].id + 1, 
            ...req.body
        })

        WriteFile(db)

        res.send('Create Movie Success!')
    } catch (error) {
        
    }
})

app.get('/movies', (req: Request, res: Response) => {
    try {
        const { status, time, date } = req.query 

        const db = ReadFile()
        const moviesJSON: any[] = db.movies
        const transactionsJSON: any[] = db.transactions

        let findMovies = moviesJSON.map((val) => {
            const movieSelected = {
                ...val, 
                seatAvailable: val.total_seat
            }
            
            transactionsJSON.map((value) => {
                if(val.id === value.moviesId && value.date === date && value.time === time){
                    movieSelected.seatAvailable = movieSelected.seatAvailable - value.total_seat
                }
            })

            if((date && time)) return movieSelected
            
            return {...val}
        })

        if(status){
            findMovies = findMovies.filter(val => val.status === status.replace("%", " "))
        }

        res.send(findMovies)
    } catch (error) {
        
    }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});