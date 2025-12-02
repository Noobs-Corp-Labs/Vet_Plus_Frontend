import HeaderPage from "@/components/shared/HeaderPage";
import { Newspaper } from "lucide-react";
import AnimalDetails from "@/components/shared/routes/animals/AnimalDetails";
import { findAnimalById } from "../../../lib/requests/vet-plus/animalsRequests";

export default async function AnimalPage({ params }: {params: Promise<{ animalId: string }>}) {
   const { animalId } = await params;
   console.log("ID", animalId)
   const animalObj = await findAnimalById(animalId);
   console.log("A", animalObj)
   // const animalObj: AnimalsType = {
   //       id: "1",
   //       ear_tag: "BR001",
   //       breed: "Holandesa",
   //       name: "Estrela",
   //       description: "Vaca leiteira saudável e dócil.",
   //       birth_date: "2020-03-15",
   //       weight: 520.4,
   //       gender: AnimalGender.FEMALE,
   //       status: AnimalStatus.LACTATING,
   //       last_predict: "Você é um Veterinário Sênior e Gerente de Rebanho com 30 anos de experiência. Sua função é pegar as análises técnicas de seus especialistas (Nutrição, Reprodução, Saúde, Performance) e traduzi-las em uma única recomendação acionável, priorizada e clara para o produtor de leite. Você sabe que o produtor não pode fazer tudo de uma vez, então você DEVE identificar a ação de maior impacto e urgência."
   //    }

   if (animalObj.result) {
      return (
         <div>
            <HeaderPage title={animalObj.result.name} icon={Newspaper} backTo={{ title: "Animal List", link: "/" }} />
            <AnimalDetails animalObj={animalObj.result} />
         </div>
      )
   }

   throw Error("Erro ao requisitar dados no animal!")
}