import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FilterBar.css";

const FilterBar = (props) => {
    const [selected, setSelected] = useState("Content");
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);

    const onSelect = (e) => {
        props.onselect(selected, min, max);
        console.log(props.onselect);
    };

    return (
        <section className="filter-bar-section">
            <Container>
                <nav className="filter-bar-contents">
                    <div className="filter-bar-content">
                        <label className="filter-text">Filter By</label>
                        <select onChange={e=>setSelected(e.target.value)} value={selected}>
                            <option value="Content">Content Based</option>
                            <option value="Price">Price Based</option>
                        </select>
                    </div>
                    {selected === "Price" && (
                        <div className="filter-bar-content">
                            <label className="filter-text">Price</label>
                            <label>
                                <input
                                    type="number"
                                    name="min"
                                    placeholder="Min"
                                    onChange={(e) =>
                                        setMin(parseInt(e.target.value))
                                    }
                                />
                            </label>
                            <label>
                                <input
                                    type="number"
                                    name="max"
                                    placeholder="Max"
                                    onChange={(e) =>
                                        setMax(parseInt(e.target.value))
                                    }
                                />
                            </label>
                        </div>
                    )}
                    <div className="filter-bar-content">
                        <button className="btn-filter" onClick={onSelect}>Filter</button>
                    </div>
                </nav>
            </Container>
        </section>
    );
};
export default FilterBar;
