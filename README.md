Hello, JCWD-2702!

+ How to Install Typescript?

        npm i -g typescript
    
        npm i -g ts-node

    - Inside Folder "intro-typescript", Type on Terminal:

            tsc --init
    
  - Setup "tsconfig.json" & Uncomment this Code: "outDir": "./bundle",
  - Running TS:
  
        ts-node filename.ts

+ How to Setup Express Typescript?
        npm init --yes

        npm i -D typescript @types/express @types/node

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