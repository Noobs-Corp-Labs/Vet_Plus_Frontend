import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

export function BackToButton({ link, title = "Voltar" }: { link: string; title?: string }) {
  return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Link href={link} className="flex items-center gap-1">
               <Undo2 size={25} strokeWidth={2.5}/>
            </Link>
         </TooltipTrigger>
         <TooltipContent>
            <p>{title}</p>
         </TooltipContent>
      </Tooltip>
  )
}