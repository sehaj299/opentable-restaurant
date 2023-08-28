import { PRICE } from "@prisma/client";
import Link from "next/link";

interface locationProps{
  
    id: number;
    name: string;

}

function SearchSideBar({locations,cuisines,searchParams}:{locations:locationProps[];cuisines:locationProps[], searchParams: { city?: string ,cuisine?:string,price?:PRICE};}) {
  const prices=[{
    price:PRICE.CHEAP,
    label:"$",
    className:"border w-full text-reg font-light rounded-l p-2"

  },{
    price:PRICE.REGULAR,
    label:"$$",
    className:"border-r border-t border-b w-full text-reg font-light p-2"
  },{
    price:PRICE.EXPENSIVE,
    label:"$$$",
    className:"border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
  }]
  return (
     <div className="w-1/5">
    <div className="border-b pb-4">
      <h1 className="mb-2">Region</h1>
      {locations.map(location=>(
         <Link href={{
          pathname: '/searchpage',
          query: { 
            ...searchParams,
            city: location.name },
        }}><p className="font-light text-reg capitalize "key={location.id}>{location.name}</p></Link>
      ))}
      
      
    </div>
    <div className="border-b pb-4 mt-3">
      <h1 className="mb-2">Cuisine</h1>
      {cuisines.map(cuisine=>(
        <Link href={{
          pathname: '/searchpage',
          query: {
            ...searchParams,
             cuisine: cuisine.name },
        }} ><p className="font-light text-reg"key={cuisine.id}>{cuisine.name}</p>
        </Link>
      ))}
      
      
    </div>
    <div className="mt-3 pb-4">
      <h1 className="mb-2">Price</h1>
      <div className="flex">
        {prices.map(({price,label,className})=>(
          <Link href={{
            pathname:'/searchpage',
            query:{
              ...searchParams,
              price,
            }
  
           } } className= {className}>
            {label}
          </Link>
        ))}
        
      </div>
    </div>
  </div>
  )
}

export default SearchSideBar