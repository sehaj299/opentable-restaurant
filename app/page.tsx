import Link from "next/link";
import Header from "./components/Header";
import RestuarantCard from "./components/RestuarantCard";
import Navbar from "./components/Navbar";
import { Cuisine,Review, Location, PRICE, PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
export  interface RestaurantCardType{
  id: number,
  name :string,
  main_image: string,
  cuisine:Cuisine,
  location:Location,
  price:PRICE,
  slug:string,
  review:Review[]
}

const fetchRestaurants=async():Promise<RestaurantCardType[]>=>{
  const restaurants=await prisma.restaurant.findMany({
    select:{
      id: true,
      name : true,
      main_image: true,
      cuisine:true,
      location:true,
      price:true,
      slug:true,
      review:true
    }
  })
  return restaurants

}
export default async function Home() {
  const restaurants=await fetchRestaurants()
  return (
    <>
      <main>
       
        <Header />

        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map((restaurant)=>(
            <RestuarantCard  restaurant={restaurant}/>

          ))}
          
        </div>
      </main>
    </>
  );
}
