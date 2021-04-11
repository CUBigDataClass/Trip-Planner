import React, { Component, Fragment } from 'react'
import StarRatings from 'react-star-ratings'
import Styles from '../styles/YelpPlaces.module.css'

const Yelp = (props) => {
   
   if (props.places.hasOwnProperty('message')) {
      return ( <p>{ props.message }</p>)
   } else {
      let arr = []
      var state = props.places[0].location.state

      for (const place of props.places){
         let add2 = place.location.address2 ? '' : ', ' + place.location.address2 ;
         let component = (
            <Fragment>
               <div className={Styles.container}>
                  <div className={Styles.innerContainer}>
                     <div className={Styles.imgContainer}>
                        <img className={Styles.cardImg} src={place.image_url}></img>
                     </div>
                     <h3 style={{margin: '10px 0px 5px 0px'}}>{place.name}</h3>
                     <StarRatings
                        rating={place.rating}
                        starRatedColor="tomato"
                        starDimension="25px"
                        starSpacing="0"
                        numberOfStars={5}
                        name='rating'
                     />
                     <h4 style={{margin: '0px 0px 5px 0px'}}>{place.price}</h4>
                     <div className={Styles.infoContainer}>
                        <sub>{place.location.address1}{add2}</sub>
                        <sub>{place.location.city}, {place.location.state}</sub>
                        <sub>{place.phone}</sub>
                     </div>
                  </div>
               </div>
            </Fragment>
         )
         arr.push(component)
      }

      return (
         <div>
            <p className="Intro">Restaurants in {state}</p>
            <div className={Styles.outerContainer}>
                  {arr}
            </div>
         </div>
      )
   }
}
 
 export default Yelp