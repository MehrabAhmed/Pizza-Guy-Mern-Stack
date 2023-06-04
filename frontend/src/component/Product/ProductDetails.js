import React, { Fragment, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReactStars  from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "./ReviewCard.js"
import {clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData"
import {addItemsToCart} from "../../actions/cartAction"



const ProductDetails = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
 
  const {product, loading, error} = useSelector(state=> state.productDetails)

  useEffect(() => {
        
   if(error)
   {
     alert.error(error);
     dispatch(clearErrors());
    }
   dispatch(getProductDetails(id))
        
    }, [dispatch, id, error, alert]);

    const options ={
        edit: false,
        color: "rgba(20,20, 20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 18:20,
        value: product.ratings,
        isHalf:true,
      }

  const [quantity, setQuantity] = useState(1);


  const increaseQuantity = () => 
  {
    const qty = quantity + 1;
    setQuantity(qty);
  };
      
  const decreaseQuantity = () => {
          
    if (1 >= quantity) return;
      
      const qty = quantity - 1;
      setQuantity(qty);
   };
 
   
   const addToCartHandler = () => {
   dispatch(addItemsToCart(id, quantity));
   alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
        {loading? (<Loader/> ): (
        <Fragment>
        < MetaData title={`${product.name} The Pizza Guy`}/>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {
                      product.images &&
                      product.images.map((item, i)=>(
                        <img className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i}Slide`}

                        />
                      ))
                    }
                </Carousel>
           </div> 
           <div>
             <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product #{product._id}</p>
             </div>
             <div className="detailsBlock-2">
                  <ReactStars {...options}/>
                  <span>
                 
                  ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                <h1>{`Rs.${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button disabled = {product.available = false ? true: false}onClick={addToCartHandler}>Add to Cart</button>
                </div>
                   <p>Available:{" "}
                   <b className={product.available = false ? "redColor" : "greenColor"}>
                    {product.available = false ? "No" : "Yes"}
                  </b>
                   </p>
                </div>
                <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">
                Submit Review
              </button>
           </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) :(
            
            <p className="noReviews" >No Reviews Yet</p>
          )}


    </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails;