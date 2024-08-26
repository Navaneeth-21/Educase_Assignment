# NodeJs Assignment
Implementing a set of APIs using Node.js, Express.js framework, and MySQL to manage school data. The Application will allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location
- It consists of following endpoints:
   - **POST REQUEST** ( '/addschool' ) => Validates the input data and adds a new school to the schools table .
   - **GET REQUEST** ('/listschool' ) => Fetches all schools from the database, sorts them based on proximity to the user's location, and returns the sorted list .
- The Application is hosted on render hosting service

### Technolgies and Tools :
- NodeJS
- ExpressJS
- MYSQL
- JOI
- Geolib library

## Application Setup

1. Clone the repository.
2. Install all the required dependencies
   ```sh
   npm install

3. Intially create your database locally on MYSQL workbench or on any cloud provider.
   
     **Database setup**
   - Create a schools table in MySQL with the following fields:
     - id (Primary Key)
     - name (VARCHAR)
     - address (VARCHAR)
     - latitude (FLOAT)
     - longitude (FLOAT)

4. Replace the fields in the .env file with your details. which consists of follwing fields :
    - DB_HOST
    - DB_USER
    - DB_PASSWORD
    - DB_NAME
    
5. Run the application
   ```sh
   npm run start

6. Navigate to the <a href="http://localhost:4000">Link</a> in your Browser
 
