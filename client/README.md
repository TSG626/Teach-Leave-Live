# Client Information
This is where the frontend is located for the web application. This includes the React frontend user interface, UI design, calls to send information to the database, and set components for page and route formatting.

## public
This includes all files that are public to the frontend. This includes icons and theme colors.

# src folder
This is where majority of the frontend is located
## components
This is where the navigation bar functionality, editor functionality, hover functionality, and avatar funcitonality are located.
## config
This is where the EditorJS functionality is set
## contexts
This is where the components recieve user credentials based on the account logged onto the device. This also includes retrieving blog post and course information based on the selected post/course the user chooses.
## modules
This is where the routing is set up for the frontend to send information to the backend
## views
This is where all of the pages are set up for users to view into the website. This also holds all of the UI structure of the pages and the process of what pages get routed to within specific sub-views.
## App.js
This is the main component where all the views get braodly organzied. This includes long term components that are displayed on every page, such as the Navigation Bar.
## index.js
This is where React starts to render. This includes the App.js to include all pages and themes.js for a default styling to ba applied to all pages.
## serviceWorker.js
This is used for developers to make production of the web application run faster.
## themes.js
This is where all the styling, such as color scheme and text sizing, is defaulted to.

## .env
This holds the Stripe API publishable keys to connect the payment system to a specific Stripe account.
