"use client"

import { AnimalsType } from "@/lib/tempType"
import { Separator } from "@/components/ui/separator"
import { LabelValueDisplay } from "@/components/shared/LabelValueDisplay"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { CalendarEvent, eventStyles } from "@/components/shared/events/EventsAux"
import { useRef, useState } from "react"
import { DaySheetEvents, DaySheetEventsRefType } from "./DaySheetEvents"
import { NewEventDialog, NewEventDialogRefType } from "../events/NewEventDialog"
import { EventType } from "@/lib/enums"
import { Card } from "@/components/ui/card"

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
      { date: new Date(2025, 10, 10), type: EventType.NUTRITIONAL, title: 'Suplementação Mineral' },
      { date: new Date(2025, 10, 10), type: EventType.HEALTH, title: 'Vacinação' },
      { date: new Date(2025, 10, 15), type: EventType.REPRODUCTIVE, title: 'Inseminação' },
      { date: new Date(2025, 10, 15), type: EventType.NUTRITIONAL, title: 'Pesagem' },
      { date: new Date(2025, 10, 20), type: EventType.PERFORMANCE, title: 'Avaliação de Ganho' },
      { date: new Date(2025, 10, 25), type: EventType.GENERAL, title: 'Manutenção' },
      { date: new Date(2025, 10, 25), type: EventType.HEALTH, title: 'Vermifugação' },
      { date: new Date(2025, 10, 25), type: EventType.NUTRITIONAL, title: 'Ajuste de Dieta' },
   ]

   const [selectDay, setSelectedDay] = useState<Date | undefined>(undefined);

   const daySheetEventsRef = useRef<DaySheetEventsRefType>(null);
   const newEventDialogRef = useRef<NewEventDialogRefType>(null);

   const handleDaySelect = (date: Date | undefined) => {
      setSelectedDay(date)
      if (date) {
         daySheetEventsRef.current?.open();
      }
   }

   const selectedDayEvents = selectDay ? getEventsForDate(selectDay, events) : []

   return (
      <div className="h-[86vh] flex gap-4">
         <div className="w-[55%] h-full">
            <Card className="grid grid-cols-3 p-4 mb-4">
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
               </Card>
               {animalObj.last_predict && (
                  <Card className="col-span-3 p-4">
                     <LabelValueDisplay title="Ultima Recomendação" text={animalObj.last_predict} />
                  </Card>
               )}
         </div>
         <div className="w-[45%] h-full">
            <Card className="p-2">
            <Calendar
               className="w-full wrounded-lg bg-card"
               mode="single"
               selected={selectDay}
               onSelect={handleDaySelect}
               components={{
                  DayButton: (props) => {
                     const date = props.day.date
                     const dayEvents = getEventsForDate(date, events)
                     
                     return (
                        <CalendarDayButton {...props}>
                           <span>{date.getDate()}</span>
                           {dayEvents.length > 0 && (
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 w-[85%] justify-center">
                                 {dayEvents.slice(0, 5).map((event, idx) => (
                                    <div
                                       key={idx}
                                       className={`h-4 w-4 rounded-full ${eventStyles[event.type].bg}`}
                                       title={event.title}
                                    />
                                 ))}
                                 {dayEvents.length > 5 && (
                                    <div className="h-4 w-4 rounded-full bg-gray-400" title={`+${dayEvents.length - 3} eventos`} />
                                 )}
                              </div>
                           )}
                        </CalendarDayButton>
                     )
                  }
               }}
            />
            </Card>
            <DaySheetEvents
               ref={daySheetEventsRef}
               date={selectDay}
               events={selectedDayEvents}
               onEventDatailsClose={() => setSelectedDay(undefined)}
               onNewButtonClick={() => newEventDialogRef.current?.open({ animal: animalObj, eventDate: selectDay})}
            />
            <NewEventDialog ref={newEventDialogRef} />
         </div>
      </div>
   )
}