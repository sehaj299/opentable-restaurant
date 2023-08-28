import Link from "next/link"

function RestaurantNavbar({slug}:{slug:string}) {
  return (
    <div><nav className="flex text-reg border-b pb-2">
    <Link href={`/Resturants/${slug}`} className="mr-7"> Overview </Link>
    <Link href={`/Resturants/${slug}/menu`} className="mr-7"> Menu </Link>
  </nav></div>
  )
}

export default RestaurantNavbar