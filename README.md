Hello, JCWD-2702!

+ How to Setup Express Typescript with MySQL as Database?
        
        npm init --yes

        npm i -D typescript express @types/express @types/node

        npm i -D concurrently nodemon

        npx tsc --init
  
  - Edit "tsconfig.json":
      - Uncomment rootDir:  "rootDir": "./src"
      - Uncomment outDir:   "outDir": "./dist"
  - Edit "scripts" on "package.json" with this Code:
    
        "scripts": {
            "build": "npx tsc",
            "start": "node dist/index.js",
            "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
        },

  - How to Running?
            
            npm run dev