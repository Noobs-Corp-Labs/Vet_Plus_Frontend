import { forwardRef, useImperativeHandle, useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form"
import { EventType } from "@/lib/enums";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { AnimalResponse } from "@noobs-corp-labs/vet-plus-backend";


export interface NewEventDialogRefType {
   open: (newEvent: Pick<NewEventFormType, "animal" | "eventDate">) => void
}

export interface NewEventFormType {
   animal: AnimalResponse;
   type: EventType;
   description: string;
   eventDate: Date | undefined;
}

interface PropsType {

}

export const NewEventDialog = forwardRef<NewEventDialogRefType, PropsType>(({}, ref) => {

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const { control, register, setValue, formState, reset, handleSubmit } = useForm<NewEventFormType>({
      mode: "onBlur",
      defaultValues: {
         animal: {
            name: "Gertrudes",
            _id: "1",
            ear_tag: "BR001",
            breed: {},
         },
         type: EventType.GENERAL,
         eventDate: new Date(),
      }
   });

   const handleOnDialogOpen = () => {
      reset();
      setIsDialogOpen(!isDialogOpen);
   }

   const handleOpenNewEventDialog = (nevEvnForm: Pick<NewEventFormType, "animal" | "eventDate">) => {
      setValue("animal", nevEvnForm.animal);
      setValue("eventDate", nevEvnForm.eventDate);
      setIsDialogOpen(true);
   }

   const onNewEventSubmit = async (data: NewEventFormType) => {
      console.log("New Event", data)
      console.log("ANi", data.animal)
      console.log("type", data.type)
      console.log("New Desv", data.description)
      console.log("DAt", data.eventDate?.toISOString().split('T')[0])
   }

   useImperativeHandle(ref, () => ({
      open: (newEvent: Pick<NewEventFormType, "animal" | "eventDate">) => handleOpenNewEventDialog(newEvent)
   }))

   return (
      <Dialog open={isDialogOpen} onOpenChange={handleOnDialogOpen}>
         <DialogContent className="max-w-3xl">
            <DialogHeader>
               <DialogTitle className="text-primary">Registre um Novo Evento</DialogTitle>
            </DialogHeader>
            <form noValidate onSubmit={handleSubmit(onNewEventSubmit)}>
               <div className="grid grid-cols-1 gap-4">
                  <Controller
                     control={control}
                     name="animal"
                     rules={{ required: "Animal é necessário" }}
                     render={({ field, fieldState }) => (
                        <Field>
                           <FieldLabel>Animal</FieldLabel>
                           <Input
                              {...field}
                              disabled
                              value={field.value.name || ""} 
                              placeholder="Animal"
                           />
                           {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                     )}
                  />
                  <Controller
                     control={control}
                     name="type"
                     rules={{ required: "Tipo de evento é necessário" }}
                     render={({ field, fieldState }) => (
                        <Field>
                           <FieldLabel htmlFor="checkout-7j9-card-name-43j">Tipo do Evento</FieldLabel>
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
                           {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                     )}
                  />
                  <Field>
                     <FieldLabel htmlFor="checkout-7j9-card-name-43j">Descrição do Evento</FieldLabel>
                     <Textarea
                        {...register("description", {
                           required: "Descrição é necessária",
                        })}
                        placeholder="Descrição"
                     />
                     {formState.errors.description && <FieldError>{formState.errors.description.message}</FieldError>}
                  </Field>
                  <Controller
                     control={control}
                     name="eventDate"
                     rules={{ required: "Data do evento é necessária" }}
                     render={({ field, fieldState }) => (
                        <Field>
                           <FieldLabel htmlFor="checkout-7j9-card-name-43j">Data do Evento</FieldLabel>
                           <Input
                              {...field}
                              disabled
                              value={field.value ? field.value.toISOString().split('T')[0] : ""}
                              type="date"
                           />
                           {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </Field>
                     )}
                  />
               </div>
               <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                  <Button type="submit">Create</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
})