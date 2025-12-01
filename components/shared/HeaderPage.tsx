import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { HelpIcon } from "./HelpIcon";
import { BackToButton } from "./header-page/BackToButton";

interface HeaderPageProps {
    title: string;
    help?: ReactNode;
    icon?: LucideIcon;
    action?: ReactNode;
    backTo?: {
        link: string;
        title?: string;
    };
}

export default function HeaderPage({ title, icon, action, help, backTo }: HeaderPageProps) {
    const Icon = icon;

   return (
      <div className="flex items-center justify-between border-b-2 border-primary h-[5vh] mt-0 mb-8">
         <div className="flex items-center gap-2 mb-1 mx-2">
            {Icon && <Icon className="w-10 h-10 stroke-primary" strokeWidth={2.5} />}
            
            <h1 className="text-4xl font-semibold inline-flex items-center gap-1 whitespace-nowrap text-primary">
               {title}
               {help && <HelpIcon help={help} />}
            </h1>
            {/* {tag && (
               <Badge 
                  className="lowercase px-2.5 rounded-full text-white"
                  style={{ backgroundColor: tagColor }}
               >
                  {tag}
               </Badge>
            )} */}
         </div>
         
         <div className="flex items-center justify-end gap-1">
            {action}
            {backTo && <BackToButton {...backTo} />}
         </div>
      </div>
  )
}
