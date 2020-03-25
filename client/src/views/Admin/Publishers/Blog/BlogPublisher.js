import React, { createContext, useState, useEffect } from 'react';
import './BlogPublisher.css';
import API from '../../../../modules/API'

const UserContext = createContext();

export default function BlogPublisher() {
    return (
        <div className="App">
            <header className="App-header">
                Blog Post
            </header>
            <form>
                <input type="text" id="title" name="title"></input>
                <textarea id="blogBody" name="blogBody"></textarea>
                <br></br>
                <button class = "button publishBlog">Publish!</button>
            </form>
        </div>
    );
}//onClick = {(e) => AddNewBuilding(e)}