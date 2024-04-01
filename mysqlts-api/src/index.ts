import express, { Express, Request, Response } from 'express';

// IMPORT CONNECTION & SETUP PROMISFY
import db from './connection';
import util from 'util';
const query: any = util.promisify(db.query).bind(db);

const app: Express = express();
// Body Parser: Mengambil Req.Body dari client
app.use(express.json())
const port = 5000;

app.get('/passangers', async(req: Request, res: Response): Promise<void> => {
  try {
    const findPassangers = await query('SELECT * FROM passangers')

    res.status(200).send({
      error: false, 
      message: 'Success', 
      data: findPassangers
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});





// Buatlah REST API Express dengan 4 Item End-Point, Dimana Setiap
// End-Point Meng-Eksekusi Request Handler Sebagai Berikut: 

// 1. User Dapat Mencari Nama Penumpang yang Berada di Kapal Titanic. 
//    Request:  /passangers?Name='Helen';

// 2. User Dapat Melihat Total Penumpang yang Selamat 
//    Request: /passangers/survived

// 3. User Dapat Melihat Total Penumpang Pria dan Total Penumpang Wanita yang Selamat
//    Requests: /passangers/survived/sex

// 4. User Dapat Melihat List Penumpang yang Selamat dan Berada di Class yang Ditentukan oleh User
//    Requests: /passangers/survived?class=1
//              OR
//              /passangers/survived?class=0