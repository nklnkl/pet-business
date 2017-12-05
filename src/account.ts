import { Account } from 'pet-entity';
import * as Validator from 'validator';
import * as Bcrypt from 'bcrypt';
import * as Moment from 'moment';
export { AccountService };

class AccountService {

  private static saltRounds = 10;

	/*
		reject codes
			0: password hashing failed
			1: email failed validation
			2: password failed validation
			3: level failed validation
	*/
	public static create (email: string, password: string, level: number) : Promise<Account> {
		return new Promise((resolve, reject) => {

			if (!Validator.isEmail(email)) reject(1);
			if (!this.validatePassword(password)) reject(2);
			if (!this.validateLevel(level)) reject(3);

			let account: Account = new Account();
			account.setEmail(email);
			account.setLevel(level);

			this.hashPassword(password)
			.then((hash: string) => {
				account.setPassword(hash);
				return resolve(account);
			})
			.catch((err: Error) => reject(0));

		});
	}

	/*
		reject codes
			0: password hashing failed
			1: email failed validation
			2: password failed validation
			3: name failed validation
			4: birth date failed validation
			5: address failed validation
			6: level failed validation
	*/
	public static update (account: Account, update: any) : Promise<Account> {
		return new Promise((resolve, reject) => {

			if (update.email) {
        if (Validator.isEmail(update.email))
          account.setEmail(update.email);
        else
          reject(1);
      }
      if (update.password) {
        if (this.validatePassword(update.password))
          account.setPassword(update.password);
        else
          reject(2);
      }
      if (update.name) {
        if (this.validateName(update.name))
          account.setName(update.name);
        else
          reject(3);
      }
      if (update.birthDate) {
        if (this.validateBirthDate(update.birthDate))
          account.setBirthDate(update.birthDate);
        else
          reject(4);
      }
      if (update.address) {
        if (this.validateAddress(update.address))
          account.setAddress(update.address);
        else
          reject(5);
      }
      if (update.level) {
        if (this.validateLevel(update.level))
          account.setLevel(update.level);
        else
          reject(6);
      }
      account.setUpdated(Moment().valueOf());

			if (update.password) {
				this.hashPassword(update.password)
				.then((hash: string) => {
					account.setPassword(hash);
					resolve(account);
				})
				.catch((err: Error) => reject(0));
			}
			else
				resolve(account);

		});
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
