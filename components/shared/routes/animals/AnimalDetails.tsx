"use client"

import { AnimalsType } from "@/lib/tempType"
import { Separator } from "@/components/ui/separator"
import { LabelValueDisplay } from "@/components/shared/LabelValueDisplay"
import { Calendar } from "@/components/ui/calendar"

interface PropsType {
   animalObj: AnimalsType
}

export default function AnimalDetails({ animalObj }: PropsType) {
   return (
      <div className="h-[86vh] flex">
         <div className="w-[55%] h-full">
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
         <div className="w-[45%] h-full">
            <Calendar mode="single" className="w-full wrounded-lg" />
         </div>
      </div>
   )
}