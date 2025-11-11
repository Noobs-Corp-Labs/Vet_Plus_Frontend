type PropsType = {
   title: string;
   value?: string | number;
}

export default function ParamDisplay({ title, value }: PropsType) {
   return (<div className="flex flex-col space-y-1">
      <h4 className="font-semibold w-full whitespace-normal wrap-break-word">
         {title || ""}
      </h4>
      <p className="text-xs text-muted-foreground">{value}</p>
   </div>)
}