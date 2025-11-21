"use client"

import { AnimalsType } from "@/lib/tempType"
import { Separator } from "@/components/ui/separator"
import { LabelValueDisplay } from "@/components/shared/LabelValueDisplay"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { CalendarEvent, eventStyles } from "@/components/shared/events/EventsAux"
import { useState } from "react"

interface PropsType {
   animalObj: AnimalsType
}

function getEventsForDate(date: Date, events: CalendarEvent[]) {
  return events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  )
}

export default function AnimalDetails({ animalObj }: PropsType) {

   const events: CalendarEvent[] = [
      { date: new Date(2025, 10, 10), type: 'nutricional', title: 'Suplementação Mineral' },
      { date: new Date(2025, 10, 10), type: 'saude', title: 'Vacinação' },
      { date: new Date(2025, 10, 15), type: 'reprodutivo', title: 'Inseminação' },
      { date: new Date(2025, 10, 15), type: 'nutricional', title: 'Pesagem' },
      { date: new Date(2025, 10, 20), type: 'performance', title: 'Avaliação de Ganho' },
      { date: new Date(2025, 10, 25), type: 'geral', title: 'Manutenção' },
      { date: new Date(2025, 10, 25), type: 'saude', title: 'Vermifugação' },
      { date: new Date(2025, 10, 25), type: 'nutricional', title: 'Ajuste de Dieta' },
   ]

   const [selectDay, setSelectedDay] = useState<Date | undefined>(undefined)

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
               {animalObj.last_predict && (
                  <div className="col-span-3">
                     <LabelValueDisplay title="Ultima Recomendação" text={animalObj.last_predict} />
                  </div>
               )}
            </div>
            <Separator orientation="horizontal" className="bg-gray-400"/>
            {selectDay?.getDate()}
         </div>
         <Separator orientation="vertical" className="bg-gray-400 h-full w-0.5 mx-2"/>
         <div className="w-[45%] h-full">
            <Calendar
               className="w-full wrounded-lg"
               mode="single"
               onSelect={setSelectedDay}
               components={{
                  DayButton: (props) => {
                     const date = props.day.date
                     const dayEvents = getEventsForDate(date, events)
                     
                     return (
                        <CalendarDayButton {...props}>
                            <span>{date.getDate()}</span>
                            {dayEvents.length > 0 && (
                               <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 w-[85%] justify-center">
                                  {dayEvents.slice(0, 3).map((event, idx) => (
                                     <div
                                        key={idx}
                                        className={`h-1 flex-1 rounded-full ${eventStyles[event.type].bg}`}
                                        title={event.title}
                                     />
                                  ))}
                                  {dayEvents.length > 3 && (
                                     <div className="h-1 w-1 rounded-full bg-gray-400" title={`+${dayEvents.length - 3} eventos`} />
                                  )}
                               </div>
                            )}
                        </CalendarDayButton>
                     )
                  }
               }}
            />
         </div>
      </div>
   )
}