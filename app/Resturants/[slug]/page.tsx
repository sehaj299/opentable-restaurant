
import { PrismaClient, Review } from "@prisma/client"
import Header from "./components/Header"
import RestaurantNavbar from "./components/RestaurantNavbar"
import Title from "./components/Title"
import Rating from "./components/Rating"
import Description from "./components/Description"
import RestaurantImages from "./components/RestaurantImages"
import Reviews from "./components/Reviews"
const prisma= new PrismaClient()
interface Restaurant{
  id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    review:Review[]
}
const fetchRestaurantBySlug=async(slug:string):Promise<Restaurant>=>{
  const restaurant= await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select:{
      id: true,
      name : true,
      images: true,
      description:true,
      slug:true,
      review:true
    }
  })
  if (!restaurant){
    throw new Error()
  }
  return restaurant
}
interface props{
  params:{
  slug:string
  }
}
async function RestaurantDetails({params}:props) {
  const restaurant=await fetchRestaurantBySlug(params.slug)
  return (
    <div> {/* HEADER */}
      <Header/>
      {/* HEADER */} {/* DESCRIPTION PORTION */}
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
         
          <RestaurantNavbar slug={restaurant.slug}/>
          {/* TITLE */}
          <Title name={restaurant.name}/>
          {/* TITLE */} {/* RATING */}
          <Rating reviews={restaurant.review}/>
          {/* RATING */} {/* DESCRIPTION */}
          <Description description={restaurant.description}/>
          {/* DESCRIPTION */} {/* IMAGES */}
          <RestaurantImages images={restaurant.images}/>
          {/* IMAGES */} {/* REVIEWS */}
          <Reviews reviews= {restaurant.review}/>
          {/* REVIEWS */}
        </div>
       
      </div>
      {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */} {/* RESERVATION
      CARD PORTION */}
   
  </div>
  )
}

export default RestaurantDetails
