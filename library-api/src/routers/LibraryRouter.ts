import { Router } from 'express';

// Define Router
const bebas = Router()

// Import Controller
import {create, createLibraryAndStaff} from '../controllers/LibraryController';

bebas.post('/', createLibraryAndStaff)

export default bebas