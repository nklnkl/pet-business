import { Account } from 'pet-entity';
import * as Validator from 'validator';
import * as Bcrypt from 'bcrypt';
import * as Moment from 'moment';
export { AccountService };

class AccountService {

  /**
  * The amount of salt rounds used for password encryption.
  */
  private static saltRounds = 10;

	/**
  * May return an Account if creation was successful.
  *
  * **Reject codes**
	*  - **0**: password hashing failed
	*  - **1**: email failed validation
	*  - **2**: password failed validation
	*  - **3**: level failed validation
	*/
	public static async create (email: string, password: string, level: number) : Promise<Account|number> {

    if (!Validator.isEmail(email)) return 1;
    if (!this.validatePassword(password)) return 2;
    if (!this.validateLevel(level)) return 3;

    let account: Account = new Account();
    account.setEmail(email);
    account.setLevel(level);

    try {
      let hash: string = await this.hashPassword(password);
      account.setPassword(hash);
      return account;
    }
    catch (err) {
      return err;
    }
	}

  /**
  * Data from the update object will be applied to the original, thus only data
  from the update will be validated. The original is assumed to be valid.
  * May return an Account if update was successful.
  *
  * **Reject codes**
  *
  * - **0**: password hashing failed
  * - **1**: email failed validation
  * - **2**: password failed validation
  * - **3**: name failed validation
  * - **4**: birth date failed validation
  * - **5**: address failed validation
  * - **6**: level failed validation
  */
	public static async update (account: Account, update: any) : Promise<Account|number> {
		if (update.email) {
      if (Validator.isEmail(update.email))
        account.setEmail(update.email);
      else
        return 1;
    }
    if (update.password) {
      if (this.validatePassword(update.password))
        account.setPassword(update.password);
      else
        return 2;
    }
    if (update.name) {
      if (this.validateName(update.name))
        account.setName(update.name);
      else
        return 3;
    }
    if (update.birthDate) {
      if (this.validateBirthDate(update.birthDate))
        account.setBirthDate(update.birthDate);
      else
        return 4;
    }
    if (update.address) {
      if (this.validateAddress(update.address))
        account.setAddress(update.address);
      else
        return 5;
    }
    if (update.level) {
      if (this.validateLevel(update.level))
        account.setLevel(update.level);
      else
        return 6;
    }
    account.setUpdated(Moment().valueOf());

    if (update.password) {
      try {
        let hash: string = await this.hashPassword(update.password);
        account.setPassword(hash);
        return account;
      }
      catch (err) {
        return err;
      }
    }
    else
      return account;
	}

	public static hashPassword (password: string) : Promise<string> {
		return new Promise((resolve, reject) => {
			Bcrypt.hash(password, this.saltRounds, function(err: Error, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});
	}

	public static checkPassword (password: string, hash: string) : Promise<boolean> {
		return new Promise((resolve, reject) => {
			Bcrypt.compare(password, hash, function (err: Error, match: boolean) {
				if (err) reject(err);
				resolve(match);
			});
		});
	}

	public static validatePassword (password: string) : boolean {
    if (typeof password !== 'string') return false;
		if (password.length < 7 || password.length > 32) return false;
		return true;
	}

	public static validateName (name: string) : boolean {
    if (typeof name !== 'string') return false;
		if (name.length < 1) return false;
		if (name.length > 16) return false;
		if (!Validator.isAlpha(name)) return false;
		return true;
	}

	public static validateBirthDate (birthDate: number) : boolean {
    if (typeof birthDate !== 'number') return false;
		let age: number = Moment().diff( Moment(birthDate), "years");
		if (age < 13) return false;
		return true;
	}

	public static validateAddress (address: string) : boolean {
    if (typeof address !== 'string') return false;
		return true;
	}

	public static validateLevel (level: number) : boolean {
    if (typeof level !== 'number') return false;
		switch (level) {
			case 1: return true;
			case 2: return true;
			default: return false;
		}
	}
}
