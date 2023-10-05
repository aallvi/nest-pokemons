import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import {  PokeResponse, Result } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {



  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http:AxiosAdapter
  ){}

async executeSeed(){


  await this.pokemonModel.deleteMany({})

 const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')


  data.results.map( (item:Result,i) => {
    item.no =  i + 1
    delete item.url
  })

  await  this.pokemonModel.insertMany(data.results)
  return  'seed executed'

  
}



}
