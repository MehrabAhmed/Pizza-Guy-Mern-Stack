import React from 'react';
import {Link} from "react-router-dom";
import ReactStars  from "react-rating-stars-component";

const ProductCard = ({ product }) => {
    const options ={
        edit: false,
        color: "rgba(20,20, 20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 18:20,
        value: product.ratings,
        isHalf:true,
    }
  return (
   <Link className="productCard" to={`/product/${product._id}`}>
    <img src={product.images} alt={product.name} />
     <p>{product.name}</p>
     <div>
        <ReactStars {...options}/>
        <span>
            ({product.numofReviews} Reviews)
        </span>
     </div>
     <span>
           { `Rs${product.price}`}
        </span>
   </Link>
  )
}

export default ProductCard;