import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown"; /**/
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; /*mapbox css need overide*/
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import PropTypes from "prop-types";

import { displayStuff } from "../../actions/searchAction.js";
import "./BannerSearch.css";

const BannerSearch = (props) => {
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
    /*mapbox css*/
    useEffect(() => {
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            countries: "np",
        });

        geocoder.addTo("#location");
        geocoder.on("result", (result) => {
            console.log(result.result.text);
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

    function onChangeHandler(e) {
        if (e.target.name === "furnished") {
            updateFurnished(e.target.value);
        }
    }

    function onSelect(value) {
        updateFacilities(value);
        console.log(facilities);
    }

    function submit(e) {
        e.preventDefault();
        console.log(
            location,
            price,
            furnished,
            type,
            facilities,
            bedroom,
            kitchen,
            toilet,
            livingRoom
        );
        const data = {
            location: location,
            type: type,
            preferences: {
                bedroom: parseInt(bedroom),
                toilet: parseInt(toilet),
                kitchen: parseInt(kitchen),
                livingRoom: parseInt(livingRoom),
            },
            facilities: facilities,
            furnished: furnished,
        };
        console.log(data);
        props.displayStuff(data);
        props.history.push("/dashboard/profile");
    }

    return (
        <main>
            <section className="banner">
                <div className="banner-container">
                    <h1>
                        Choose Your
                        <br />
                        Space
                    </h1>
                    <form onSubmit={submit}>
                        <div className="search-box-container">
                            <div className="search-box">
                                <div className="search-description">
                                    Location
                                </div>
                                <div id="location"></div>
                            </div>
                            <div className="search-box">
                                <div className="search-description">
                                    Property Type
                                </div>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => updatetype(e.target.value)}
                                >
                                    <option value="house">House</option>
                                    <option value="room">Room</option>
                                </select>
                            </div>
                            <div className="search-box">
                                <div className="search-description">
                                    Price Range
                                </div>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="What’s your budget?"
                                    onChange={(e) =>
                                        updateprice(e.target.value)
                                    }
                                />
                            </div>
                            <div className="search-box dropdown">
                                <div className="search-description">
                                    Preference
                                </div>
                                <button
                                    className="dropbtn"
                                    onClick={(e) => e.preventDefault()}
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
                            <div className="search-box">
                                <div className="search-description">
                                    Facilities
                                </div>
                                <Multiselect
                                    options={options}
                                    isObject={false}
                                    onSelect={onSelect}
                                    onRemove={onSelect}
                                />
                            </div>
                            <div className="search-box">
                                <div className="search-description">
                                    Furnished ?
                                </div>

                                <select
                                    value={furnished}
                                    onChange={(e) =>
                                        updateFurnished(e.target.value)
                                    }
                                >
                                    <option value="FullyFurnished">
                                        FullyFurnished
                                    </option>
                                    <option value="Semi-Furnished">
                                        Semi-Furnished
                                    </option>
                                    <option value="Not-Furnished">
                                        Not-Furnished
                                    </option>
                                </select>
                            </div>
                        </div>
                        <input type="submit" value="Search" />
                    </form>
                </div>
            </section>
        </main>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    data: state.data,
    errors: state.errors,
});

BannerSearch.protoTypes = {
    displayStuff: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { displayStuff })(BannerSearch);
