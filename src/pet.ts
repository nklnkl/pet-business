import { Pet, Breeds, Species } from 'pet-entity';
import * as Moment from 'moment';
import * as Validator from 'validator';
export { PetService };

class PetService {

  /*
    reject codes
      1: species number is invalid
      2: breed number is invalid
      3: name failed validation
      4: status failed validation
  */
  public static create (species: number, breed: number, birthDate: number, name: string, status: number) : Promise<Pet> {
    return new Promise((resolve, reject) => {
      if (!this.validateSpecies(species))
        reject(1);
      if (!this.validateBreed(species, breed))
        reject(2);
      if (!this.validateName(name))
        reject(3);
      if (!this.validateStatus(status))
        reject(4);

      let pet: Pet = new Pet();
      pet.setSpecies(species);
      pet.setBreed(breed);
      pet.setBirthDate(birthDate);
      pet.setName(name);
      resolve(pet);
    });
  }

  /*
    reject codes
      1: species number is invalid
      2: breed number is invalid
      3: name failed validation
  */
  public static update (pet: Pet, update: Pet) : Promise<Pet> {
    return new Promise((resolve, reject) => {
      if (update.getSpecies() == 0 || update.getSpecies() > Species.getList().length - 1)
        reject(1);
      if (update.getBreed() == 0 || update.getBreed() > Breeds.getList()[update.getSpecies()].length - 1)
        reject(2);
      if (!this.validateName(update.getName()))
        reject(3);

      pet.setSpecies(update.getSpecies());
      pet.setBreed(update.getBreed());
      pet.setBirthDate(update.getBirthDate());
      pet.setName(update.getName());
      resolve(pet);
    });
  }

  public static validateName (name: string) : boolean {
    if (name.length < 1) return false;
    if (name.length > 16) return false;
    if (!Validator.isAlpha(name)) return false;
    return true;
  }
  public static validateSpecies (species: number) : boolean {
    if (species == 0 || species > Species.getList().length - 1)
      return false;
    return true;
  }
  public static validateBreed (species: number, breed: number) : boolean {
    if (breed == 0 || breed > Breeds.getList()[species].length - 1)
      return false;
    return true;
  }
  public static validateStatus (status: number) : boolean {
    if (status == 0 || status > 2)
      return false;
    return true;
  }
}
