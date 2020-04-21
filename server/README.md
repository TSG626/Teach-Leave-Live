# Server Information
This is where the backend is located for the web application. This includes database manipulations from frontend, database models, routing, and email set ups.

## config
- authEmail.js: This is the process of how emails are sent when a user creates an account
- config.js: This is where the MongoDB and Stripe API keys are stroed.
- express.js: This is where the middlewhere is set up.
- passport.js: This is where logging in is handled.
- passwordreset.js: This is how the password resets are set up for "Forgot Password" functionality.

## email
This folder stores the structure of all the emails between TLL and users. This includes the "Contact Us" form email, authentification email where users verify their account, the forgot password email where users are sent a code to allow a password change, a newsletter email that is sent through the Newsletter Publisher, and a welcome email that is sent upon a user that verifies their account.

- config.js: This is where the email can be set as the root of the automated emails. Any emails sent or reiceved will be contacted through the listed email.

## models
This is how each document is structed to be saved onto the MongoDB.

- Blog: title, description, body, authors array (based on User object), data updated, date published, published boolean, comments allowed, comments array (includes a body, author, date, replies).
- Course: title, authors array (based on their User object), description, free boolean, published boolean, price, subject, modules array (includes sections that have a title and content), data updated, and date published.
- Email: Just needs an email.
- Password Reset: email, password reset code, and password reset attempts.
- User: username, email, password, status (security), first name, last name, reference, email verified boolean, key for verifing, avatar, courses array (based on Course object), cart array (based on Courses object).

## routes
This is where all the interaction between the MongoDB and Frontend happens with routing.

- addEmail: Functionality for sending emails.
- admin: Functionality for admin operations.
- auth: Functionality for user authentifications.
- blog: Functionality for blog editing.
- cart: Functionality for shopping cart operations.
- contact: Functionality for contact page operations.
- courses: Functionality for course editing.
- user: Functionality for user operations.
- index: sets up routing paths for all routes.
