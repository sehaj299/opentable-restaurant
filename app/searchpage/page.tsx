import Header from "./Components/Header";
import RestaurantCard from "./Components/RestaurantCard";
import SearchSideBar from "./Components/SearchSideBar";
import { PRICE, PrismaClient } from "@prisma/client";
interface searchParams{ city?: string ,cuisine?:string,price?:PRICE}
const prisma = new PrismaClient();
const getLocations=async()=>{
   const locations=await prisma.location.findMany({
    select:{
      id:true,
      name:true
    }
   })
   
   return locations
}
const getCuisines=async()=>{
  const cuisines=await prisma.cuisine.findMany({
   select:{
     id:true,
     name:true
   }
  })
  
  return cuisines
}
const getRestaurantByLocation = (searchParams:searchParams) => {
  const where:any={}
  if(searchParams.city){
    const location={
     
        name: {
          equals: searchParams.city.toLowerCase(),
        },
      

    }
   where.location=location
  }
  if(searchParams.cuisine){
    const cuisine={
      
        name: {
          equals: searchParams.cuisine,
        },
    

    }
   where.cuisine=cuisine

  }
  if(searchParams.price){
    const price={
      
        
          equals: searchParams.price
        
      }
   where.price=price
    }
   

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    slug: true,
    cuisine: true,
    location: true,
  };
  
  return prisma.restaurant.findMany({
   where,
    select,
  });
};

async function SearchPage({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  const searchRestaurant = await getRestaurantByLocation(searchParams);
  const locations=await getLocations()
  const cuisines=await getCuisines()
  console.log(locations)
  return (
    <>
      {/* HEADER */}
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        {/* SEARCH SIDE BAR */}
        <SearchSideBar locations={locations} cuisines={cuisines}searchParams={searchParams}/>
        {/* SEARCH SIDE BAR */}
        <div className="w-5/6">
          {/* RESAURANT CAR */}
          {searchRestaurant.length ? (
            <>
              
              {searchRestaurant.map((restaurant) => (
                <RestaurantCard restaurant={restaurant}key={restaurant.id} />
              ))}
            </>
          ) : (
            <><h5>No record</h5></>
            
          )}

         
        </div>
      </div>
    </>
  );
}

export default SearchPage;
