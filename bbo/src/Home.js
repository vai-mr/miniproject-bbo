import React from 'react'
import "./Home.css";
import Product from './Product';
import Book1 from './book1.jpeg'

function Home() {
    return (
        <div class='home'>
            <br></br>
            <div className="home_row">
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
            </div>  
            <div className="home_row">
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                /> 
            </div>
            <div className="home_row">
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
                <Product
                    id="b1"
                    title="science tb"
                    price={1000}
                    image={Book1}
                    rating={3}
                />
            </div>         
        </div>
    )
}

export default Home
