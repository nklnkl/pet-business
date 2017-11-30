import {Pet} from 'pet-entity';
import * as moment from 'moment';
export {PetService};
class PetService {
  public create(breed: number, species: number, birthdate: number, name: string) : Pet | number{
      let pet: Pet = new Pet();
      pet.setBreed(breed);
      pet.setName(name);

      if(species==0 || species==1)
        pet.setSpecies(species);

      pet.setBirthDate(birthdate);

  }
}
