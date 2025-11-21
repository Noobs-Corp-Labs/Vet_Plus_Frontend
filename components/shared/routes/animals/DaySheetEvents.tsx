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
import { CalendarEvent } from "@/components/shared/events/EventsAux";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface DaySheetEventsRefType {
   open: () => void
}
interface PropsType {
  date: Date | undefined;
  events: CalendarEvent[];
  onEventDatailsClose?: () => void;
}

export const DaySheetEvents = forwardRef<DaySheetEventsRefType, PropsType>(({ date, events, onEventDatailsClose }, ref) => {

   const [isSheetOpen, setIsSheetOpen] = useState(false)

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
            <SheetTitle>
               {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Detalhes do Dia"}
            </SheetTitle>
            <SheetDescription>
               {events.length > 0 
               ? `Você tem ${events.length} eventos agendados para este dia.`
               : "Nenhum evento registrado para esta data."}
            </SheetDescription>
         </SheetHeader>

         <div className="p-6 flex flex-col gap-4">
            {events.length === 0 ? (
               <p className="text-muted-foreground text-sm">Sem atividades.</p>
            ) : (
               events.map((event, index) => (
               <div key={index} className="border p-4 rounded-lg shadow-sm">
                  <p className="font-bold capitalize">{event.type}</p>
                  <p>{event.title}</p>
               </div>
               ))
            )}
         </div>

         <SheetFooter>
            <SheetClose asChild>
               <Button type="button">Fechar</Button>
            </SheetClose>
         </SheetFooter>
         </SheetContent>
      </Sheet>
   );
});