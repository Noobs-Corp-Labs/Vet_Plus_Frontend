import { forwardRef, useImperativeHandle, useState } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Controller, useForm } from "react-hook-form"
import { AnimalsType } from "@/lib/tempType";
import { EventType } from "@/lib/enums";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


export interface NewEventDialogRefType {
   open: () => void
}

export interface NewEventFormType {
   animal: AnimalsType;
   type: EventType;
   description: string;
   eventDate: Date;
}

interface PropsType {

}

export const NewEventDialog = forwardRef<NewEventDialogRefType, PropsType>(({}, ref) => {

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const { control, register, reset } = useForm<NewEventFormType>({
      mode: "onBlur",
      defaultValues: {
         animal: {
            name: "TEste",
            id: "1",
            ear_tag: "BR001",
            breed: "Holandesa",
         },
         type: EventType.GENERAL,
         eventDate: new Date(),
      }
   });

   const handleOnDialogOpen = () => {
      reset();
      setIsDialogOpen(!isDialogOpen);
   }

   useImperativeHandle(ref, () => ({
      open: () => setIsDialogOpen(true)
   }))

   return (
      <AlertDialog open={isDialogOpen} onOpenChange={handleOnDialogOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle className="text-primary">Register New Event</AlertDialogTitle>
            </AlertDialogHeader>
            <form noValidate onSubmit={() => {}}>
               <div className="grid grid-cols-1 gap-4">
                  <Controller
                     control={control}
                     name="animal"
                     render={({ field }) => (
                        <Input
                           {...field}
                           disabled
                           value={field.value.name || ""} 
                           placeholder="Animal"
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="type"
                     render={({ field}) => (
                        <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Tipo de Evento" />
                           </SelectTrigger>
                           <SelectContent>
                              {Object.values(EventType).map((eventType) => (
                                 <SelectItem key={`event_type_option_${eventType}`} value={eventType}>
                                    {eventType}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     )}
                  />
                  <Textarea
                     {...register("description")}
                     placeholder="Descrição"
                  />
                  <Input
                     {...register("eventDate")}
                     type="date"
                  />
               </div>
            </form>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction>Create</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
})