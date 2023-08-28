import Link from "next/link"
import { RestaurantCardType } from "../page";
import Price from "./Price";

interface props{
  restaurant:RestaurantCardType;
}
function RestuarantCard(restaurant:props) {
  console.log("card",restaurant)
  return (
    <div
    className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
  >
    <Link href={`/Resturants/${restaurant.restaurant.slug}`}>
    <img
      src={restaurant.restaurant.main_image}
      alt=""
      className="w-full h-36"
    />
    <div className="p-1">
      <h3 className="font-bold text-2xl mb-2">{restaurant.restaurant.name}</h3>
      <div className="flex items-start">
        <div className="flex mb-2">*****</div>
        <p className="ml-2">{restaurant.restaurant.review.length} reviews</p>
      </div>
      <div className="flex text-reg font-light capitalize">
        <p className=" mr-3">{restaurant.restaurant.cuisine.name}</p>
        <Price price={restaurant.restaurant.price}/>
        <p>{restaurant.restaurant.location.name}</p>
      </div>
      <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
    </div>
    </Link>
  </div>
  )
}

export default RestuarantCard