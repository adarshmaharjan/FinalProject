import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import UserPosts from './UserPosts/UserPosts.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import './Profile.css';



const Profile = () => {

    const [key, setKey] = useState('profile');
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
              <UserInfo/> 
            </Tab>
        </Tabs>
    );
};

export default Profile;
