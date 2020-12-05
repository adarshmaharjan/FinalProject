import React from "react";
import {Container,Row,Col} from 'react-bootstrap';
import './FilterBar.css';


const FilterBar = () => {
    return(
        <section className = "filter-bar-section" >
            <Container>
                <nav className = "filter-bar-contents">
                    
                
                    <div className = "filter-bar-content">
                        <label className = 'filter-text'>Price</label>
                        <label><input type = "number" name = 'min' placeholder = "Min"/></label>
                        <label><input type = "number" name = "max" placeholder = "Max"/></label>
                    </div>
                
                
                    <div className = "filter-bar-content">
                        <label className = 'filter-text'>Loacation</label>
                        <label><input type = "text" name = "location" placeholder = "Location"/></label>
                    </div>
                       
                    
                </nav>
            </Container>
            
        </section>
    );
}
export default FilterBar;