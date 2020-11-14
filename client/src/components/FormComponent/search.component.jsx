import React, { useState, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Multiselect } from "multiselect-react-dropdown";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from 'axios';
import "./search.css";

const Search = () => {
    const [location, updatelocation] = useState("");
    const [price, updateprice] = useState(0);
    const [furnished, updateFurnished] = useState("");
    const [type, updatetype] = useState("");
    const [bedroom, updateBedroom] = useState(1);
    const [kitchen, updateKitchen] = useState(1);
    const [toilet, updateToilet] = useState(1);
    const [livingRoom, updateLivingRoom] = useState(0);
    const [facilities, updateFacilities] = useState([]);
    const options = ["CableTv", "Parking", "Internet", "Water-Supply"];

    useEffect(() => {
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: "np"
        });

        geocoder.addTo("#location");
        geocoder.on("result", result => {
            console.log(result.result.text);
            // this.setState({ location: result.result.text });
            updatelocation(result.result.text);
        });
    }, []);

    function onChangePreference(e) {
        if (e.target.name === "bedroom") {
            updateBedroom(e.target.value);
        } else if (e.target.name === "kitchen") {
            updateKitchen(e.target.value);
        } else if (e.target.name === "toilet") {
            updateToilet(e.target.value);
        } else {
            updateLivingRoom(e.target.value);
        }
    }

    function onChangeHandler(e){
        if(e.target.name === "furnished"){
            updateFurnished(e.target.value);
        }
    }

    function onSelect(value) {
        updateFacilities(value);
        console.log(facilities);
    }

    function submit(e){
        e.preventDefault();
        console.log(location,price,furnished,type,facilities,bedroom,kitchen,toilet,livingRoom);
        const data = {
            location:location,
            type:type,
            preferences:{
                bedroom:parseInt(bedroom),
                toilet:parseInt(toilet),
                kitchen:parseInt(kitchen),
                livingRoom:parseInt(livingRoom)
            },
            facilities:facilities,
            furnished:furnished
        };
        console.log(data);
        axios.post('http://localhost:5000/api/search/search-post',data)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error.response);
            });
    }

    return (
        <Fragment>
            <form className="form-container" onSubmit={submit}>
                <div>
                    <label htmlFor="location">
                        Enter a title location of room
                    </label>
                    <div id="location"></div>
                </div>
                <div>
                    <label htmlFor="choice">Type</label>
                    <select id="type" value={type} onChange={e=>updatetype(e.target.value)}>
                        <option value="house">House</option>
                        <option value="room">Room</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="furnished">Furnished</label>
                    <select value={furnished} onChange={(e)=>updateFurnished(e.target.value)}>
                        <option value="FullyFurnished">FullyFurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Not-Furnished">Not-Furnished</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" value={price} onChange={e=>updateprice(e.target.value)}/>
                </div>
                <div className="dropdown">
                    <button
                        className="dropbtn"
                        onClick={e => e.preventDefault()}
                    >
                        Preference
                    </button>
                    <div className="dropdown-content">
                        <div className="flex-content-pref">
                            <label>Bedroom</label>
                            <input
                                type="number"
                                name="bedroom"
                                value={bedroom}
                                onChange={onChangePreference}
                                max="5"
                                min="1"
                            />
                        </div>
                        <div className="flex-content-pref">
                            <label>Livingroom</label>
                            <input
                                type="number"
                                name="livingroom"
                                value={livingRoom}
                                onChange={onChangePreference}
                                max="2"
                                min="1"
                            />
                        </div>
                        <div className="flex-content-pref">
                            <label>Kitchen</label>
                            <input
                                type="number"
                                value={kitchen}
                                name="kitchen"
                                onChange={onChangePreference}
                                max="2"
                                min="1"
                            />
                        </div>
                        <div className="flex-content-pref">
                            <label>Toilet</label>
                            <input
                                type="number"
                                value={toilet}
                                name="toilet"
                                onChange={onChangePreference}
                                max="2"
                                min="1"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Multiselect options={options} isObject={false} onSelect={onSelect} onRemove={onSelect}/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </Fragment>
    );
};

export default Search;
