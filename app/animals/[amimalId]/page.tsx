export default async function AnimalPage({ params }: {params: Promise<{ amimalId: string }>}) {
   const { amimalId } = await params;
   

   return (
      <>Olá {amimalId}</>
   )
}