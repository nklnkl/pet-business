import { Pet, Breeds, Species } from 'pet-entity';
import * as Moment from 'moment';
import * as Validator from 'validator';
export { PetService };

class PetService {

  /**
  * Data from the update object will be applied to the original, thus only data
  from the update will be validated. The original is assumed to be valid.
  * May return a Pet if creation was successful.
  *
  * **Reject codes**
	* - **1**: species number is invalid
  * - **2**: breed number is invalid
  * - **3**: name failed validation
  * - **4**: birth date failed validation
  * - **5**: status failed validation
  * - **6**: images failed validation
	*/
  public static create (species: number, breed: number, birthDate: number, name: string, status: number, images: Array<string>) : Promise<Pet> {
    return new Promise((resolve, reject) => {
      if (!this.validateSpecies(species))
        reject(1);
      if (!this.validateBreed(species, breed))
        reject(2);
      if (!this.validateName(name))
        reject(3);
      if (!this.validateBirthDate(birthDate))
        reject(4);
      if (!this.validateStatus(status))
        reject(5);
      if (!this.validateImages(images))
        reject(6);

      let pet: Pet = new Pet();
      pet.setSpecies(species);
      pet.setBreed(breed);
      pet.setName(name);
      pet.setBirthDate(birthDate);
      pet.setStatus(status);
      pet.setImages(images);
      resolve(pet);
    });
  }

  /**
  * May return a Pet if update was successful.
  *
  * **Reject codes**
	* - **1**: species number is invalid
  * - **2**: breed number is invalid
  * - **3**: name failed validation
  * - **4**: birth date failed validation
  * - **5**: status failed validation
  * - **6**: images failed validation
	*/
  public static update (pet: Pet, update: any) : Promise<Pet> {
    return new Promise((resolve, reject) => {
      if (update.species) {
        if (this.validateSpecies(update.species))
          pet.setSpecies(update.species);
        else
          reject(1);
      }
      if (update.breed && update.species) {
        if (this.validateBreed(update.species, update.breed))
          pet.setBreed(update.breed);
        else
          reject(2);
      }
      if (update.name) {
        if (this.validateName(update.name))
          pet.setName(update.name);
        else
          reject(3);
      }
      if (update.birthDate) {
        if (this.validateBirthDate(update.birthDate))
          pet.setBirthDate(update.birthDate);
        else
          reject(4);
      }
      if (update.status) {
        if (this.validateStatus(update.status))
          pet.setStatus(update.status);
        else
          reject(5);
      }
      if (update.images) {
        if (this.validateImages(update.images))
          pet.setImages(update.images);
        else
          reject(5);
      }

      pet.setUpdated(Moment().valueOf());

      resolve(pet);
    });
  }

  public static validateName (name: string) : boolean {
    if (typeof name !== 'string') return false;
    if (name.length < 1) return false;
    if (name.length > 16) return false;
    if (!Validator.isAlpha(name)) return false;
    return true;
  }
  public static validateSpecies (species: number) : boolean {
    if (typeof species !== 'number') return false;
    if (species == 0 || species > Species.getList().length - 1)
      return false;
    return true;
  }
  public static validateBreed (species: number, breed: number) : boolean {
    if (typeof species !== 'number') return false;
    if (typeof breed !== 'number') return false;
    if (breed == 0 || breed > Breeds.getList()[species].length - 1)
      return false;
    return true;
  }
  public static validateBirthDate (birthDate: number) : boolean {
    if (typeof birthDate !== 'number') return false;
    return true;
  }
  public static validateStatus (status: number) : boolean {
    if (typeof status !== 'number') return false;
    if (status == 0 || status > 2)
      return false;
    return true;
  }
  public static validateImages (images: Array<string>) : boolean {
    images.forEach((image: string) => {
      if (!Validator.isURL(image)) return false;
    });
    return true;
  }
}
