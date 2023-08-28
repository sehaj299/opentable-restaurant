import Header from "../components/Header"
import Menu from "../components/Menu"
import RestaurantNavbar from "../components/RestaurantNavbar"
import { PrismaClient } from "@prisma/client"
const prisma=new PrismaClient()

const fetchRestaurantItems=async (slug:string)=>{
  const restaurantItem=await prisma.restaurant.findUnique({
    where:{
      slug,
    },
    select:{
      items:true
    }
  })
  if(!restaurantItem){
    throw new Error
  }
  return restaurantItem.items

}
async function RestaurantMenu({params}:{params:{slug:string}}) {
  const menu= await fetchRestaurantItems(params.slug)
  console.log(menu)
  return (
    <div><main className="bg-gray-100 min-h-screen w-screen">
    <main className="max-w-screen-2xl m-auto bg-white">
      {/* HEADER */}
      <Header/>
      {/* HEADER */} {/* DESCRIPTION PORTION */}
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          
           <RestaurantNavbar slug={params.slug}/>
         
         <Menu menu={menu}/>
       
        </div>
      </div>
      {/* DESCRIPTION PORTION */}
    </main>
  </main>
  </div>
  )
}

export default RestaurantMenu