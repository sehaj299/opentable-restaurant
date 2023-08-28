import { Review } from "@prisma/client"


function Rating({reviews}:{reviews:Review[]}) {
  return (
    <div><div className="flex items-end">
    <div className="ratings mt-2 flex items-center">
      <p>*****</p>
      <p className="text-reg ml-3">4.9</p>
    </div>
    <div>
      <p className="text-reg ml-4">{reviews.length} Reviews</p>
    </div>
  </div></div>
  )
}

export default Rating