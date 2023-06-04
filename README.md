# API Documentation
This document provides an overview of the JavaScript code for an API built using Express.js. The API manages users, sites, drones, and missions. It utilizes JSON Web Tokens (JWT) for authentication. Below you will find details about the available routes and their functionalities.

## Prerequisites
Before using the API, make sure you have the following prerequisites:

* Node.js and npm installed.
* Required dependencies installed (express, jwt).

### Installation
To install the necessary dependencies, run the following command:

```shell
npm install
```

## Starting the Server
To start the server, use the following command:

```shell
node app.js
```

## API Routes
### User Management
#### Register a User
URL: POST /users/register
- Description: Registers a new user.
- Request Body: { "username": "string", "password": "string" }
- Response: The newly created user object.
#### Login
URL: POST /users/login
- Description: Authenticates a user and generates a JWT token.
- Request Body: { "username": "string", "password": "string" }
- Response: The JWT token, username, and drones array.
#### Get Users List
URL: GET /users/users
- Description: Retrieves the list of all users.
- Authorization: JWT token in the Authorization header.
- Response: An object containing the list of users.
### Site Management
#### Get Sites List
URL: GET /users/sites
- Description: Retrieves the list of all sites.
- Authorization: JWT token in the Authorization header.
- Response: An array of site objects.
#### Add Site
URL: PUT /users/sites/add/:siteId
- Description: Adds a site to a user's list of sites.
- Parameters: siteId - ID of the site to be added.
- Authorization: JWT token in the Authorization header.
- Response: The updated user object.
#### Update Site
URL: POST /users/sites/update/:siteId
- Description: Updates an existing site.
- Parameters: siteId - ID of the site to be updated.
- Authorization: JWT token in the Authorization header.
- Request Body: { "site": { "id": "number", "name": "string", ... } } (site object with updated properties)
- Response: The updated site object.
#### Delete Site
URL: DELETE /users/sites/delete/:siteId
- Description: Deletes a site from a user's list of sites.
- Parameters: siteId - ID of the site to be deleted.
- Authorization: JWT token in the Authorization header.
- Response: The updated user object.
#### Retrieve Drones at a Site
URL: GET /users/sites/:siteId/drones
- Description: Retrieves the list of drones at a specific site.
- Parameters: siteId - ID of the site.
- Response: An array of drone objects.
#### Retrieve Missions and Drones for a Site
URL: GET /users/sites/:siteId/missions
- Description: Retrieves the list of missions and drones associated with a site.
- Parameters: siteId - ID of the site.
- Response: An array of mission objects.
### Drone Management
#### Add Drone to Site
URL: PUT /users/sites/:siteId/drones/add/:droneId
- Description: Adds a drone to a specific site.
- Parameters: siteId - ID of the site, droneId - ID of the drone.
- Response: The updated drone object.
#### Delete Drone from Site
URL: DELETE /users/sites/:siteId/drones/delete/:droneId
- Description: Deletes a drone from a specific site.
- Parameters: siteId - ID of the site, droneId - ID of the drone.
- Response: 204 No Content if successful.
### Mission Management
#### Add Mission to Site
URL: PUT /users/sites/:siteId/missions/add/:missionId
- Description: Adds a mission to a specific site.
- Parameters: siteId - ID of the site, missionId - ID of the mission.
- Response: The updated site object.
#### Delete Mission from Site
URL: DELETE /users/sites/:siteId/missions/delete/:missionId
- Description: Deletes a mission from a specific site.
- Parameters: siteId - ID of the site, missionId - ID of the mission.
- Response: The updated site object.
## Conclusion
This API provides endpoints to manage users, sites, drones, and missions. It uses JWT for authentication and provides functionalities for user registration, login, site management, drone management, and mission management. Use the provided route descriptions and examples to interact with the API endpoints effectively.