Hello, JCWD-2702!

+ How to Setup ORM Prisma (JS or TS)?
1. Install Package

       npm install prisma --save-dev

       npx prisma init --datasource-provider mysql

2. Edit on .env File

       DATABASE_URL="mysql://root:abc12345@localhost:3306/day08_prisma"

3. Create Model Inside "prisma > schema.prisma":
   
       model Users {
            id    String     @id @default(cuid())
            email String  @unique
            name  String
            password String
          
            usersaddress UsersAddress[]
          
            createdAt DateTime @default(now()) 
            updatedAt DateTime @default(now()) 
        }
  
        model UsersAddress{
          id    Int     @id @default(autoincrement())
          consignee String 
          address String
        
          users Users @relation(fields: [usersId], references: [id])
          usersId String @unique  
        
          createdAt DateTime @default(now()) 
          updatedAt DateTime @default(now()) 
        }

4. Migration Models

         npx prisma migrate dev

5. Setup Seeders
   - Create "seed.js" on "prisma" Folders
   - After That, You Can Execute This Command:

            npx prisma db seed