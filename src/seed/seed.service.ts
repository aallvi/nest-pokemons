import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import {  PokeResponse, Result } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios ;


async executeSeed(){

 const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')


  data.results.map( (item:Result,i) => {
    item.no =  i + 1
    delete item.url
  })

  return  data.results
}



}
