# Library Management System Frontend

[Backend Repo](https://github.com/thananonp/server-side-scripting-project-backend)

[Deployed Frontend](https://sssf-frontend.web.app/)

## About

### What have changed from the presentation
1. The pagination now work in every table.
2. Fix button and other element margin.
3. Change the button to their outlined variant.
4. Improve search page to include the number of result.
5. Add the missing staff manage page.

This project is made for server-side scripting service. This is the frontend part.

![img](picture/sssf-frontent.png)
![img1](picture/sssf-frontend-2.png)
![img1](picture/sssf-frontend-3.png)
![img1](picture/sssf-frontend-4.png)

This project is made using these libraries

* Apollo Client
* JSON Web Token
* GraphQL
* React
* React Router
* React Bootstrap

## Project structure

    .
    ├── .firebase         # Folder containing firebase config
    ├── public            # Folder containing static built file
    ├── src               # Source files
    │   ├── helpers       # For initializing libraries, helpers function
    │   ├── hooks         # For creating React hooks
    │   ├── pages         # For pages to be display
    │   ├── reducers      # For create Redux reducer
    │   ├── App.js        # Main app component
    │   ├── App.css       # Stylesheet for the application
    ├── LICENSE
    └── README.md

## Sources Components

Components contain React components that is display in more than one page. E.g. LoadingSpinner Landing is the homepage
where user will land on. NavBar will show base on the login state. Search is the search page.

Author, Book, Category, Publisher will have

* view page
* add page
* edit page.

User and Staff will have

* Change Password Page
* Home Page
* Login Page
* Register Page
* Setting Page

## Overview

#### Register

The user input all the required information. The frontend validates the input and send the information to the backend, and the user is created.

##### Login

When the user or the staff log in. The website sends the login credentials to the backend via GraphQL. The server then
will authenticate and send the token back to the frontend. The token is kept in Local Storage and also the Redux state.

##### Logout

When the user or staff click logout. The redux state and Local Storage will be cleared.

##### Permission Lock

If you visit the page that require the permission. The website will check for the token and verified it. If the token
cannot be verified. The webpage will redirect to the landing page to prevent the information from being accessed.

##### Search

When you input the search query. It is dispatched via Redux and the query is executed when the page is loaded. You can
click the link to go and view the information about the Author, Book, Category and Publisher.

#### Mutation

Mutation can only be done by staff members. So the add, edit and delete operation can only be done by staff members
only.

##### GraphQL

The queries and the mutations is done by Apollo Server. Frontend also has error handling. If the fetch is failed, the
alert is shown.



