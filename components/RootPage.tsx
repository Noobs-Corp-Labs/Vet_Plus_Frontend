"use client"

import { AnimalsType } from "@/lib/tempType"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ParamDisplay from "@/components/shared/ParamDisplay"
import Link from "next/link"

type PropsType = {
   animals: AnimalsType[]
}

export default function RootPage({ animals }: PropsType) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 overflow-y-auto h-[87vh]">
         {animals.map(animal => (
            <Link href={`/animals/${animal.id}`} 
               key={`animal_card_${animal.ear_tag || animal.id}`}
               className="block text-inherit no-underline"
            >
            <Card
               key={`animal_card_${animal.ear_tag || animal.id}`}
               className="h-full flex p-2 hover:bg-accent"
            >
               <CardHeader>
                  <CardTitle>
                     <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        {animal.name}
                     </h2>
                  </CardTitle>
                  <CardDescription>{animal.description}</CardDescription>
               </CardHeader>
               <CardContent>
                  <ParamDisplay title="Gênero" value={animal.gender} />
                  <ParamDisplay title="Status" value={animal.status} />
                  <ParamDisplay title="CD Orelha" value={animal.ear_tag} />
               </CardContent>
            </Card>
            </Link>
         ))}
      </div>
   )
}