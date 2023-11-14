import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {


  constructor(
        @InjectModel( Pokemon.name )
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //! Metodo con multi promesas
    // const insertPromisesArray = [];

    // data.results.forEach(({name, url}) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];
    //   const pokemonPromise = this.pokemonModel.create({no, name});
    //   insertPromisesArray.push(pokemonPromise);
    // });

    // await Promise.all(insertPromisesArray);

    const pokemonToInsert: { name: string, no: number}[] = [];
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      const pokemon = {no, name};

      pokemonToInsert.push(pokemon);
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed insertada';
  }
}
