# Teach. Leave. Live.
Teach. Leave. Live. (TLL) is an online platform where teachers can leave work at work and enjoy time away. This web application provides resources for teachers to manage their work life with organizational and management skills. These resources are in the form of courses with videos, articles, and so on.

Join the newsletter to be updated on teaching advice, and visit the blog to hear from us directly!

## Team Members
- Omer Amir
- Simon Frank
- Spencer Bass
- Brian Barker
- Daniel Park
- Amanda Aribe

## Features (User)
- Landing Page: This is the page where all users begin. This includes recent blogs, recent courses, an about section, social media links, and newsletter sign up.
- Sign Up Page: This is where users can sign up for an account. They must provide a first name, last name, a unique user name, a unqiue email, and a password. Users may also include where they heard about the web application from.
- Login Page: This is where users can log into their account. They must provide a valid email with a corresponding password to access an account.
- Newsletter Sign Up: This is where users can sign up to see newsletters without an account. The user must provide an email to view newsetters.
- Home Page: This is the page where all users are directed to once they log in. This includes their recently purchased courses, recently posted blogs, and access to all the routes from the navigation bar on the top.
- Course Page: This is the page where users can view their purchased courses. The courses are listed by row and can be accessed by clicking on the course. Clicking a course will direct a user to the corresponding course, allowing the user to go through modules.
- Blog Page: This is the page where users can view blogs. The blogs are listed by row and can be accessed by clicking on the blog. Users may add comments if they choose to react to a blog post.
- Course Store: This is the page where users can purchase courses. Available courses are listed as small cards. The user can expand on a course information by clicking the expand button. The user may send the course to it shopping cart by clicking the add button.
- Payments: Users may checkout their courses by purchasing them via Stripe. They must provide their credit card credentials if the course has a fee. Once the transaction is approved, the courses are given to the user under their account.
- User Account View: This is the page where users can view their credentials. The user may change its username, password, and profile picture by clicking the corresponding buttons.
- Contact Me Page: This allows users to send inquiries to the owner by inputting their email and description.

## Features (Moderator, Admin, and Owner)
- User Management: Users are able to view the status of all users in this page. Every users' name, email, username, and secruity status is listed on each row. Depending on the status level, users may promote or demote user statuses. Users may also be deleted through here as well.
- Blog Publisher: Users are able to publish blogs in this page. All preexisting blogs are displayed by row. Blogs can also be edited and deleted. Additionally, adding a blog requires a title, description, and author contribution.
- Course Publisher: Users are able to publish courses in this page. All preexisting courses are displayed by row. Courses can also be edited and deleted. Additionally, adding a course requires a title, description, author contribution, and a price.
- Newletter Publisher: Users are able to publish a newsletter in this page. They must provide and title and description. The user can also provide a link if they choose to. Upon sending the newsletter will allow all accounts and newletter signed up emails to recieve the email.

# Dependencies
- EditorJS
- Material UI: This is where our UI stems off from.
- React: This is the main JavaScript library used for user interface.
- PassportJS
- Bcrypt: This allows passwords to be encrypted.
- Express
- Jsonwebtoken
- Mocha
- Morgan
- MongoDB: This is where users, blogs, courses, and emails are stored for the web application.
- Nodemailer: This allows Node.js to send emails.
- Nodemon: This assists developers utilizing Node.js by handling file changes.
- StripeAPI: This sets up payments for the web application to purchase courses.
- React Avatar: This allows users to upload an avatar to their account.
