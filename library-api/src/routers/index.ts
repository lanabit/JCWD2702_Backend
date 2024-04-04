import express, {Router} from 'express';

// Define Router
const bebas = Router()
bebas.use(express.json()) // Body Parser

// Import Admin Router
import LibraryRouter from './LibraryRouter';

bebas.use('/library', LibraryRouter)

export default bebas