# React Recipe Management System

This repository contains a modern React recipe management application built with React Bootstrap for UI components and JSON Server for backend simulation. The app features a complete recipe management experience including recipe browsing, filtering by tags, recipe rating and sorting, user authentication, personal recipe collections, and recipe sharing capabilities. It demonstrates React component architecture, state management, RESTful API integration, and user authentication for a collaborative recipe management platform.

## Prerequisites

- Node.js and npm installed on your system
- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- (Optional) A code editor like VS Code, Sublime Text, or Atom for easier code navigation

## Installation

1. **Clone the repository** (if not already downloaded):
   ```sh
   git clone <repository-url>
   cd Recipe-Management-main
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```

## How to Run

1. **Start the JSON Server** (backend simulation):
   ```sh
   npx json-server --watch database.json --port 9999
   ```

2. **Start the React development server** (in a new terminal):
   ```sh
   npm start
   ```

This will open the app in your default browser at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes to the source code.

**Note**: Make sure both the JSON Server (port 9999) and React development server (port 3000) are running simultaneously for the application to work properly.

## Project Structure

```
Recipe-Management-main/
├── database.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── login.jsx
│   │   ├── main.jsx
│   │   ├── recipe.jsx
│   │   └── yourRecipe.jsx
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

- **database.json**: Mock database containing recipes, users, and personal recipe collections for the JSON Server.
- **public/**: Contains static assets and the HTML template.
  - `index.html`: The main HTML file loaded by React.
  - `manifest.json`, `robots.txt`: Standard web app metadata and configuration.
- **src/**: Contains the React source code.
  - `components/`: Reusable React components for different sections of the app.
    - `login.jsx`: User authentication component with login form and validation.
    - `main.jsx`: Main dashboard component with recipe browsing, filtering, and personal collection management.
    - `recipe.jsx`: Recipe management component with search, sorting, and recipe operations.
    - `yourRecipe.jsx`: Personal recipe collection component for saved recipes.
  - `App.js`: Main application component with routing and authentication state management.
  - `index.js`: Entry point that renders the React app.
- **package.json**: Project metadata and dependencies including React, React Bootstrap, Axios, and JSON Server.
- **README.md**: Project documentation (this file).

## Features

- **User Authentication**: Secure login system with user validation and session management
- **Recipe Browsing**: Browse and display recipes with detailed information including ingredients, instructions, and nutritional data
- **Recipe Search**: Search recipes by tags using real-time filtering
- **Recipe Rating System**: View and sort recipes by rating in ascending or descending order
- **Personal Recipe Collections**: Add recipes to personal collections and manage saved recipes
- **Recipe Management**: Add, remove, and organize personal recipe collections
- **Responsive Design**: Modern, responsive interface built with Bootstrap for optimal viewing on all devices
- **Real-time Updates**: Dynamic data updates with JSON Server backend simulation
- **Interactive UI**: Clean card-based layout with recipe images, ratings, and action buttons

## Data Structure

The application manages the following data entities:

- **Users**: User information with id, firstName, lastName, email, username, password, and role
- **Recipes**: Recipe items with id, name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, tags, userId, image, rating, reviewCount, and mealType
- **Your Recipes**: Personal recipe collections linking users to their saved recipes

## Technologies Used

- **React 19.0.0**: Modern React with hooks and functional components
- **React Bootstrap 2.10.6**: Bootstrap components built for React
- **Bootstrap 5.3.3**: CSS framework for responsive design and UI components
- **Axios 1.7.9**: HTTP client for API requests
- **React Router DOM 7.0.2**: Client-side routing for navigation
- **JSON Server 0.17.3**: Mock REST API backend for development
- **React Scripts 5.0.1**: Development and build tools

## API Endpoints

The application uses the following JSON Server endpoints:

- `GET /users` - Retrieve all users for authentication
- `GET /recipes` - Retrieve all recipes
- `GET /your_recipes` - Retrieve user's personal recipe collections
- `POST /your_recipes` - Add recipes to user's personal collection
- `DELETE /your_recipes/{id}` - Remove recipes from user's personal collection

## Features in Detail

### User Authentication (`login.jsx`)
- Clean login form with username and password fields
- Real-time validation and error messaging
- Session management using localStorage
- Automatic navigation to main dashboard upon successful login

### Recipe Dashboard (`main.jsx`)
- Displays recipes in responsive card layout with images and ratings
- Tag-based search functionality with real-time filtering
- Rating-based sorting (ascending/descending)
- Recipe detail viewing with ingredients and instructions
- Add recipes to personal collection with duplicate checking
- Remove recipes from personal collection
- Save personal collections to database

### Recipe Management (`recipe.jsx`)
- Comprehensive recipe browsing interface
- Advanced search by recipe tags
- Rating-based sorting capabilities
- Recipe addition to personal collections
- Database persistence for user collections
- Confirmation dialogs for recipe operations

### Personal Recipe Collections (`yourRecipe.jsx`)
- View and manage saved recipes
- Remove recipes from personal collection
- Persistent storage of user preferences

## User Roles and Permissions

The application supports different user roles:
- **Admin**: Full access to all features
- **Moderator**: Enhanced access to recipe management
- **User**: Standard access to browse and save recipes

## Recipe Information Displayed

Each recipe includes comprehensive information:
- **Basic Details**: Name, cuisine type, difficulty level
- **Timing**: Preparation and cooking time
- **Nutrition**: Calories per serving
- **Ingredients**: Complete ingredient list with quantities
- **Instructions**: Step-by-step cooking instructions
- **Metadata**: Tags, meal types, ratings, and review counts
- **Visual**: Recipe images for enhanced user experience

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)
- For questions or contributions, please open an issue or pull request.
