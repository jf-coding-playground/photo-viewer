#Photo Viewer Application

##Features
**Client**
  - built with React (and Typescript)
  - responsive design
  - infinite scrolling implemented
  - filter images by dimensions
  - toggle for grayscale images
  - error handling to bad response

**Server side**:
  - built with Nestjs (a nodejs framework)
  - endpoints for retrieving photos (and grayscale photos)
  - endpoints support sending any number of photos at a given time if range is specified
    * endpoint: /photos/startingIndex/endingIndex
    * for example
      - /photos/0/10 will return the first 10 images listed in a csv file (or database)
      - /photos/4/10 will return 5 images starting from the fifth image in the list
  - request caching
  - error handling to bad requests


##Getting Started

**Step 1**: build client side code
  1. Navigate into "photo-viewer-client" folder in your terminal 
  2. Run these commands in order
    - npm install
    - npm run build
  
  Running those commands will produce a build folder

**Step 2:** Transfer client side code into server folder
  1. Copy the build folder into the "photo-viewer-server" folder
  2. Navigate into "photo-viewer-server" folder in your terminal
  3. Rename the build folder to "client"
  4. Rename the ".env.sample" file to ".env"
  5. Open up the .env file and add a port number where is says "SERVER_PORT" like 8080 or 3000
  4. Run these commands in order
    - npm install
    - npm start
