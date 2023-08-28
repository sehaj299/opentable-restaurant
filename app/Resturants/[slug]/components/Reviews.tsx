import { Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"


function Reviews({reviews}:{reviews:Review[]}) {
  return (
    <div><div>
    <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
      What 100 people are saying
    </h1>
    <div>
      {/* REVIEW CARD */}
    {reviews.map(review=>(
      <ReviewCard review={review}/>

    ))}
     
      {/* REVIEW CARD */}
    </div>
  </div></div>
  )
}

export default Reviews