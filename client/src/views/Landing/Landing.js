import React from 'react';
import Button from '@material-ui/core/Button';
import './Landing.css';

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
                            The world is changing and as the world is changing and the technology is 
                            involving there is lots and lots of garbage piling up every day in our whole world. 
                            This is leading to many diseases such as Malaria and Dengue and causes a lot of pollution. 
                            People are becoming careless and think that garbage is only the responsibility of poor 
                            people, but I want to say that it is responsibility of every person living in this world 
                            to not to throw garbage. That is why government has made a rule that wet waste will go 
                            in green dustbin and dry waste in blue dustbin. So, that wet waste can be decomposed, and 
                            dry waste can be recycled. Also, don't throw garbage in water as it causes water pollution 
                            and diseases like Jaundice and Cholera. So, save earth and make it green.
                        </text>
                    </div>
                </div>
                <div>
                    <text className = "Socials">Socials</text>
                    <div className = "ButtonGrid">
                        <Button className="InstLink" href="https://www.instagram.com/teachleavelive/"></Button>
                        <Button className="TwitLink" href="https://www.twitter.com"></Button>
                        <Button className="FBLink" href="https://www.facebook.com"></Button>
                        <Button className="OtherLink" href="https://www.teacherspayteachers.com/Store/Teach-Leave-Live"></Button>
                    </div>
                    <div className = "ButtonGrid">
                        <Button class="LoginLink" href="/User/Login">LOGIN</Button>
                    </div>
                </div>
            </div>

            <div className="column2">
                <div className="RecentBlogs">
                    <text>Recent Blogs</text>
                    <div className="BlogList">
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </div>
                </div>
            </div>
        </div>
    );
}