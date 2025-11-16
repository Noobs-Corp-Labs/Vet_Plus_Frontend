"use client"

import { AnimalsType } from "@/lib/tempType"
import { Separator } from "@/components/ui/separator"
import { LabelValueDisplay } from "../../LabelValueDisplay"

interface PropsType {
   animalObj: AnimalsType
}

export default function AnimalDetails({ animalObj }: PropsType) {
   return (
      <div className="h-[86vh] flex">
         <div className="w-[50%] h-full">
            <div className="grid grid-cols-3">
               <LabelValueDisplay title="Nome" text={animalObj.name} />
               <LabelValueDisplay title="Gênero" text={animalObj.gender} />
               <LabelValueDisplay title="Código Orelha" text={animalObj.ear_tag} />
               <div className="col-span-3">
                  <LabelValueDisplay title="Descrição" text={animalObj.description} />
               </div>
               <div className="col-span-1">
                  <LabelValueDisplay title="Raça" text={animalObj.breed} />
               </div>
               <div className="col-span-1">
                  <LabelValueDisplay title="Peso" text={animalObj.weight} />
               </div>
               <div className="col-span-1">
                  <LabelValueDisplay title="Status" text={animalObj.status} />
               </div>
            </div>
         </div>
         <Separator orientation="vertical" className="bg-gray-400 h-full w-0.5 mx-2"/>
         <div className="w-[50%] h-full bg-red-400">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{animalObj.name}</h2>
            <h1>{animalObj.name}</h1>
         </div>
      </div>
   )
}