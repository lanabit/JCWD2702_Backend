import express, { Express, NextFunction, Request, Response } from 'express';
import routers from './routers';

const app: Express = express();

const port = 5000;

app.use(routers)

// CENTRALIZED ERROR
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  console.log(err.status)
  res
  .status(err.status || 500)
  .send({
    error: true, 
    message: err.message || 'Error',
    data: {}
  })
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
//    Requests: /passangers?Survived=1&Pclass=1
//              OR
//              /passangers?Survived=1&Pclass=2