import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ReactNode } from "react"

export function HelpIcon({ help }: { help?: ReactNode }) {
  if (!help) return null
  
   return (
      <Tooltip>
         <TooltipTrigger>
            <Info className="w-4 h-4 text-muted-foreground" />
         </TooltipTrigger>
         <TooltipContent>
            <p>{help}</p>
         </TooltipContent>
      </Tooltip>
   )
}