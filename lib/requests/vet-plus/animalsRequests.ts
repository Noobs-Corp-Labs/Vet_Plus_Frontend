"use server"

import http from "node:http";
import https from "node:https";

import { AnimalResponse, AnimalsApi, ListResponseAnimalResponse } from "@noobs-corp-labs/vet-plus-backend"
import { normalApiConfig } from "../apiUrlConfig"
import { vetPlusBackendUrl } from "@/lib/environmentVariables"
import RequestResponse from "../requestResponse";

export async function findAndCountAnimals() {
   let requestResponse: RequestResponse<ListResponseAnimalResponse>
   const vetPlusApi = new AnimalsApi(await normalApiConfig(vetPlusBackendUrl))
   try {
      
      const { data } = await vetPlusApi.getAllAnimalsAnimalsGet({
         httpAgent: new http.Agent({ keepAlive: true }),
         httpsAgent: new https.Agent({ keepAlive: true }),
      })

      requestResponse = {
         result: data
      }
   } catch (error) {
      requestResponse = {
         error: error
      }
   }
   
   return requestResponse;
}

export async function findAnimalById(animalId: string) {
   let requestResponse: RequestResponse<AnimalResponse>
   const vetPlusApi = new AnimalsApi(await normalApiConfig(vetPlusBackendUrl))
   try {
      
      const { data } = await vetPlusApi.getOneAnimalAnimalsAnimalIdentifierGet(animalId, {
         httpAgent: new http.Agent({ keepAlive: true }),
         httpsAgent: new https.Agent({ keepAlive: true }),
      })

      requestResponse = {
         result: data
      }
   } catch (error) {
      requestResponse = {
         error: error
      }
   }
   
   return requestResponse;
}