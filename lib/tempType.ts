import { AnimalGender, AnimalStatus } from "@/lib/enums";

export type AnimalsType = {
  id: string;
  ear_tag?: string;
  // breed: Breed;
  breed: string;
  name: string;
  description: string;
  birth_date: string;
  weight: number;
  gender: AnimalGender;
  status: AnimalStatus;
}