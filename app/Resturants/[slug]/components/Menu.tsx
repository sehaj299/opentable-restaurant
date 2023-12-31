import React from 'react'
import MenuCard from './MenuCard'
import { Item } from '@prisma/client'

function Menu({menu}:{menu:Item[]}) {
  return (
    <div> <main className="bg-white mt-5">
    <div>
      <div className="mt-4 pb-1 mb-1">
        <h1 className="font-bold text-4xl">Menu</h1>
      </div>
      <div className="flex flex-wrap justify-between">
        {/* MENU CARD */}
        {menu.map(item=>(
            <MenuCard key={item.id} item={item}/>
        ))}
        
        {/* MENU CARD */}
      </div>
    </div>
  </main></div>
  )
}

export default Menu