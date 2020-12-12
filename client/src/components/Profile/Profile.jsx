import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import UserPosts from './UserPosts/UserPosts.jsx';
import './Profile.css';


const Profile = () => {

    const [key, setKey] = useState('home');
    return (
        <Tabs
            className="tab"
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="home" title="Your Posts">

                <UserPosts/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
                asdfasdf
            </Tab>
        </Tabs>
    );
};

export default Profile;
