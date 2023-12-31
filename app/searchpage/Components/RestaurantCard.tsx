import Price from "@/app/components/Price"
import Link from "next/link"
import { Cuisine,PRICE,Location } from "@prisma/client"
interface Restaurant{
  id: number,
  name :string,
  main_image: string,
  price:PRICE,
  slug:string,
  cuisine: Cuisine,
  location:Location
  
}
function RestaurantCard({restaurant}:{restaurant:Restaurant}) {
  return (
   <><div className="border-b flex pb-5">
   <img
     src={restaurant.main_image}
     alt=""
     className="w-44 h-36 rounded"
   />
   <div className="pl-5">
     <h2 className="text-3xl">{restaurant.name}</h2>
     <div className="flex items-start">
       <div className="flex mb-2">*****</div>
       <p className="ml-2 text-sm">Awesome</p>
     </div>
     <div className="mb-9">
       <div className="font-light flex text-reg">
         <p className="mr-4"> <Price price={restaurant.price}/></p>
         <p className="mr-4">{restaurant.cuisine.name}</p>
         <p className="mr-4">{restaurant.location.name}</p>
       </div>
     </div>
     <div className="text-red-600">
       <Link href={`/Resturants/${restaurant.slug}`}>View more information</Link>
     </div>
   </div>
 </div></>
      
    )
    
  
}

export default RestaurantCard