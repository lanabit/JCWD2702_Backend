// VARIABLE
let nama = 'Defryan';
let address: any = 'Bogor';
address = 123
address = true 
address = []
let isMarried: boolean = true;
let students: [] = []

let studentName
studentName = 'Ryan'
studentName = 123


// ARRAY
// Array Biasa: Value didalam array memiliki tipe data yang sama
// [1, 3, 5, 7, 9, 11]
let numbers: number[] = [1, 3, 5, 7, 9, 11]

// Array Tuples: Value didalam array memiliki tipe data yang beragam
let arrData: [string, number, boolean] = ['Abc', 123, true]
let arrData1: any[] = [123, true, 'Abc']



// Object
type TobjStudent = {
    name: string, 
    address: string, 
    program?: 'JCWD' | 'JCDS' | 'JCUIUX' | 'JCDM'
}

let objStudent: TobjStudent
objStudent = {
    name: 'Defryan', 
    address: 'Bogor',
}



// Function
// With Return
function Greeting(): string{
    return 'Hello'
}

function Multiply(): number{
    return 5 * 5
}

// Without Return
function Show(): void{
    console.log('Hello')
}


// With Parameter
function Modulo(a: number, b: number): number{
    return a%b
}

Modulo(5, 5)



// INTERFACE
type Tprogram = 'JCWD' | 'JCDM'

interface IobjCampussPwd{
    name: string, 
    location: string, 
    program: Tprogram
}

let objCampussPwd: IobjCampussPwd = {
    name: 'BSD', 
    location: 'GOP-09', 
    program: 'JCWD'
}