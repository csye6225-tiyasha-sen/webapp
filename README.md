# webapp

APIs available in this service:

//Check if the application has connectivity to the database

GET /healthz

//Authenticated operations for inserting user details

GET /v1/user/self
PUT /v1/user/self

//Public operations needed:

GET /healthz
POST /healthz
PUT /healthz
DELETE /healthz
HEAD /healthz
OPTIONS /healthz
POST /v1/user

The following steps to be performed to run the project:

1. Go to the main folder through the terminal
2. npm install
3. Start with npm run start
4. Run the test file with npm test

//Implemented Integration Tests for the below scenarios:

1. To create an account and validating if the user account exists
2. To update an account and validating if the user account gets updated

To implemement this, an integration test class has been written and for the git workflow to run, one integration yml file has been added.
