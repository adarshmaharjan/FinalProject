import React, { Fragment, Component } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
//this is changed
import { Multiselect } from "multiselect-react-dropdown";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {Container} from "react-bootstrap";
import './formComponent.css';
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiYWJzazEyMzQiLCJhIjoiY2s3Z3Z3azB6MDQyNzNmbzkxd3MwN3hnNyJ9.-paJt9fSR1rw0Wq0LwSmig";

class Addroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            name: "",
            email: "",
            number: 0,
            location: "",
            description: "",
            coordinates: [0, 0],
            bedroom: 0,
            kitchen: 0,
            toilet: 0,
            livingRoom:0,
            price: 0,
            furnished:'',
            imageCollection: null,
            previewSource: [],
            lng: 85.314038,
            lat: 27.70549,
            zoom: 5,
            //this is changed
            facilities:[],
        };

        this.onFileChange = this.onFileChange.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPreviewFile = this.onPreviewFile.bind(this);
        //this is changed
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        var geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.addControl(geolocate);
        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([84.124, 28.3949])
            .addTo(map);

        const onDragEnd = () => {
            var lngLat = marker.getLngLat();
            console.log(lngLat.lng, lngLat.lat);
            this.setState({ coordinates: [lngLat.lng, lngLat.lat] });
        };
        marker.on("dragend", onDragEnd);

        var geocoder = new MapboxGeocoder({
            accessToken:mapboxgl.accessToken,
            countries:'np',
        })    

        geocoder.addTo('#location');
        geocoder.on("result",(result)=>{
            console.log(result.result.text);
            this.setState({location:result.result.text});
        })
    }

    onChangeLocation(e){
        console.log(e.target.value);
        this.setState({location:e.target.value});
    }

    onPreviewFile(file) {
        for (let i = 0; i < file.length; i++) {
            (file => {
                const reader = new FileReader();
                const blob = new Blob([file], { type: "image/png" });
                reader.readAsDataURL(blob);
                console.log(blob);
                reader.onload = () => {
                    let data = [...this.state.previewSource];
                    data.push(reader.result);
                    this.setState({ previewSource: data });
                };
            })(file[i]);
        }
    }

    onChangeInput(e) {
        if(e.target.type ===  "checkbox"){
            this.setState({[e.target.id]: e.target.checked});
        }else{
            this.setState({ [e.target.id]: e.target.value });
        }
        console.log(e.target.value);
    }

    onFileChange(e) {
        let file = [];
        file = [...e.target.files];
        console.log(e.target.files[0]);
        this.setState({ imageCollection: file });
        this.onPreviewFile(file);
    }

    //this is changed
    onSelect(value){
        this.setState({facilities: value});
        console.log(this.state.facilities);
    }

    async onSubmit(e) {
        e.preventDefault();
        const data = {
            name:this.state.name,
            email:this.state.email,
            number:parseInt(this.state.number),
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            coordinates: {
                latitude: this.state.coordinates[0],
                longitude: this.state.coordinates[1]
            },
            rooms: {
                bedroom: parseInt(this.state.bedroom),
                kitchen: parseInt(this.state.kitchen),
                toilet: parseInt(this.state.toilet),
                livingRoom: parseInt(this.state.livingRoom)
            },
            furnished: this.state.furnished,
            facilities:this.state.facilities,
            price: parseInt(this.state.price),
            imageCollection: JSON.stringify(this.state.previewSource)
        };
        console.log(data);
        console.log(typeof JSON.stringify(data));
        axios
            .post("http://localhost:5000/api/ad/addRoom", data)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        const options = ["CableTv", "Parking", "Internet", "Water-Supply"];
        return (
            <section className = "form-section">
                <Container>

                    <div className = "adv-container">
                    {/* ---------form part------------- */}
                        <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="title">Title</label>
                                </div> 
                                <div className = "col-75">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={this.onChangeInput}
                                        value={this.state.title}
                                    />
                                </div>
                                
                            </div>

                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="name">name</label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={this.onChangeInput}
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="email">email</label>
                                </div>
                            <div className = "col-75">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        onChange={this.onChangeInput}
                                        value={this.state.email}
                                    />
                            </div> 
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="number">number</label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="number"
                                        name="number"
                                        id="number"
                                        onChange={this.onChangeInput}
                                        value={this.state.number}
                                    />
                                </div>
                            
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="location">
                                        location of room
                                    </label>
                                </div>
                                
                                <div className = "col-75">
                                    <div
                                        id="location"
                                        value={this.state.location} 
                                    />
                                </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="description">
                                        description
                                    </label>
                                </div>
                            
                                <div className = "col-75">
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        onChange={this.onChangeInput}
                                        value={this.state.description}
                                    />
                                </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="bedroom">Number of bedroom</label>
                                </div>
                            <div className = "col-75">
                                    <input
                                        type="number"
                                        name="bedroom"
                                        id="bedroom"
                                        onChange={this.onChangeInput}
                                        value={this.state.room}
                                    />
                            </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="title">Number of kitchen</label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="number"
                                        name="kitchen"
                                        id="kitchen"
                                        onChange={this.onChangeInput}
                                        value={this.state.kitchen}
                                    />
                                </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="title">Number of toilet</label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="number"
                                        name="toilet"
                                        id="toilet"
                                        onChange={this.onChangeInput}
                                        value={this.state.toilet}
                                    />
                                </div>
                            
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="title">Number of livingRoom</label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="number"
                                        name="livingRoom"
                                        id="livingRoom"
                                        onChange={this.onChangeInput}
                                        value={this.state.livingRoom}
                                    />
                                </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="furnished">Furnished</label>
                                </div>
                                <div className = "col-75">
                                    <select id="furnished" name="furnish" onChange={this.onChangeInput} value={this.state.furnished}>
                                        <option value="Furnished">Furnished</option>
                                        <option value="Not furnished">Not Furnished</option>
                                        <option value="Semi furnished">Semi Furnished</option>
                                    </select>
                                </div>
                            </div>
                                {/* this is changed  */}
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="facilities">Facilities</label>
                                </div>
                                <div className = "col-75">
                                    <Multiselect options={options} isObject={false} onSelect={this.onSelect} onRemove={this.onSelect}/>
                                </div>
                            </div>
                                
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="title">price </label>
                                </div>
                                <div className = "col-75">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        onChange={this.onChangeInput}
                                        value={this.state.price}
                                    />
                                </div>
                                
                            </div>

                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="images">Upload multiple images</label>
                                </div>
                            <div className = "col-75">
                                <input
                                        type="file"
                                        id="fileInput"
                                        name="image"
                                        onChange={this.onFileChange}
                                        multiple
                                    />
                            </div>
                            </div>
                            <div className = "adv-row">
                                <div className = "col-25">
                                    <label htmlFor="map">Drag the marker to the location</label>
                                </div>
                                <div className = "col-75">
                                    <div
                                        ref={el => (this.mapContainer = el)}
                                        className="mapContainer"
                                    ></div>
                                </div>
                            </div>

                            <div className = "adv-row">
                                <input type="submit" value = "Submit"/>
                            </div>
                        </form>
                    {this.state.previewSource[0] &&
                        this.state.previewSource.map((data, index) => (
                            <img
                                src={data}
                                key={index}
                                alt="choosen"
                                style={{ height: "300px" }}
                            />
                        ))}
                    </div>

                </Container>

            </section>
        );
    }
}

export default Addroom;
