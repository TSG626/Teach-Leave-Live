import React from "react";
import Button from "@material-ui/core/Button";

export default function Landing() {
  return (
    <div className="App">
      <div className="Welcome">
        <text>Teach. Leave. Live.</text>
      </div>

      <div className="NormalHeader">
        <text>Welcome to TLL!</text>
      </div>

      <div className="column1">
        <div className="About">
          <div className="AboutTitle">
            <text>About TLL</text>
          </div>

          <div className="BodyText">
            <text>
              TLL is a web-based platform designed to provide tools to teachers
              so that they can teach their hearts out, leave work at work, and
              live life with intention. We provide resources for teachers to
              learn how to efficiently manage time and organize their work.
            </text>
          </div>
        </div>
        <div className="TopPad">
          <div className="TopLinks">
            <text className="Socials">Socials</text>
            <div className="ButtonGrid">
              <Button
                className="InstLink"
                target="_blank"
                rel="noopener"
                href="https://www.instagram.com/teachleavelive/"
              ></Button>
              <Button
                className="TwitLink"
                target="_blank"
                rel="noopener"
                href="https://www.twitter.com"
              ></Button>
              <Button
                className="FBLink"
                target="_blank"
                rel="noopener"
                href="https://www.facebook.com"
              ></Button>
              <Button
                className="OtherLink"
                target="_blank"
                rel="noopener"
                href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live"
              ></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="column2">
        <div className="BlogTableSection">
          <text className="RecentBlogs">Recent Blogs</text>
          <div className="BlogList">
            <table>
              <th>
                <td>User</td>
              </th>
              <th>
                <td>Blog Post</td>
              </th>
              <tr>
                <td>Spencer</td>
                <td>This website is cool</td>
              </tr>
              <tr>
                <td>Amanda</td>
                <td>This website is nice</td>
              </tr>
              <tr>
                <td>Daniel</td>
                <td>This website is awesome</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
