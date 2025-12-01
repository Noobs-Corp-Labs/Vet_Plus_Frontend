import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CalendarEvent, eventStyles } from "@/components/shared/events/EventsAux";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface DaySheetEventsRefType {
   open: () => void
}
interface PropsType {
  date: Date | undefined;
  events: CalendarEvent[];
  onEventDatailsClose?: () => void;
  onNewButtonClick?: () => void;
}

export const DaySheetEvents = forwardRef<DaySheetEventsRefType, PropsType>(({ date, events, onEventDatailsClose, onNewButtonClick }, ref) => {

   const [isSheetOpen, setIsSheetOpen] = useState(false)

   const handleNewEventClick = () => {
      if  (onNewButtonClick) {
         onNewButtonClick()
      }
      onSheetClose(false);
   }

   const onSheetClose = (open: boolean) => {
      if (!open && onEventDatailsClose) {
         onEventDatailsClose();
      }
      setIsSheetOpen(!isSheetOpen)
   }

   useImperativeHandle(ref, () => ({
      open: () => setIsSheetOpen(true)
   }))

   return (
      <Sheet open={isSheetOpen} onOpenChange={onSheetClose}>
         <SheetContent side="right" className="sm:max-w-[45%] w-full overflow-y-auto">
         <SheetHeader>
            <SheetTitle className="text-4xl text-primary">
               {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Detalhes do Dia"}
            </SheetTitle>
            {onNewButtonClick && (
               <SheetDescription className="flex justify-end">
                  <Button onClick={handleNewEventClick}>New Event</Button>
               </SheetDescription>
            )}
         </SheetHeader>

         <div className="p-6 flex flex-col gap-4 overflow-scroll">
            {events.length === 0 ? (
               <p className="text-muted-foreground">Sem atividades.</p>
            ) : (
               events.map((event, index) => (
               <div key={index} className={`border px-4 py-2 rounded-md shadow-sm ${eventStyles[event.type].border} ${eventStyles[event.type].bg2}`}>
                  <h3 className={`font-bold capitalize ${eventStyles[event.type].text}`}>{event.type}</h3>
                  <p>{event.title}</p>
               </div>
               ))
            )}
         </div>

         <SheetFooter>
            <SheetClose asChild>
               <Button variant="outline" type="button">Fechar</Button>
            </SheetClose>
         </SheetFooter>
         </SheetContent>
      </Sheet>
   );
});