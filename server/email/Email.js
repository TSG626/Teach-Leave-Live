import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import logo from './logo.png'
import Instagram from './instagram.png'
import './Email.css'

Email({ data }) {
    return renderToStaticMarkup(
        < center className="container" >
            <td className="logo"><img img src={logo} alt="logo" /></td>
            <div className="content">
                <table>
                    <tr className="column2">
                        <td className="column2Header"> Hello, {data.firstName}  </td>
                        <td className="column2Body"> Thank you for creating an account for Teach Leave Live! We are so excited for you to join
                        our community and begin to take advantage of all of our great resources. Creating an account allows you to:
                        <li>Recieve newsletters from Teach Leave Live</li>
                            <li>Read all past blog posts and leave comments</li>
                            <li>Complete courses and earn certificates</li>
                            <li>Buy courses from the course store</li></td>
                        <td className="column2Body2">Get started by signing into our website or visiting our socials. Click the icons below to be directed to our website or instagram.</td>
                        <center>
                            <td><a href="http://teachleavelive.com/"><img img src={logo} alt="logo" width="60" height="60" /></a></td>
                            <td><a href="https://www.instagram.com/teachleavelive/"><img img src={Instagram} alt="Instagram" width="50" height="50" /></a></td>
                        </center>

                    </tr>
                </table>
            </div>
        </center >
    );
}

export default Email;