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
	public static update (account: Account, update: Account) : Promise<Account> {
		return new Promise((resolve, reject) => {

			if (!Validator.isEmail(update.getEmail())) reject(1);
			if (update.getPassword() && update.getPassword() != '')
				if (!this.validatePassword(update.getPassword())) reject(2);
			if (!this.validateName(update.getName())) reject(3);
			if (!this.validateBirthDate(update.getBirthDate())) reject(4);
			if (!this.validateAddress(update.getAddress())) reject(5);
			if (!this.validateLevel(update.getLevel())) reject(6);

			account.setEmail(update.getEmail());
			account.setName(update.getName());
			account.setBirthDate(update.getBirthDate());
			account.setAddress(update.getAddress());

			if (update.getPassword() && update.getPassword() != '') {
				this.hashPassword(update.getPassword())
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
		if (password.length < 7 || password.length > 32) return false;
		return true;
	}

	public static validateName (name: string) : boolean {
		if (name.length < 1) return false;
		if (name.length > 16) return false;
		if (!Validator.isAlpha(name)) return false;
		return true;
	}

	public static validateBirthDate (birthDate: number) : boolean {
		let age: number = Moment().diff( Moment(birthDate), "years");
		if (age < 13) return false;
		return true;
	}

	public static validateAddress (address: string) : boolean {
		return true;
	}

	public static validateLevel (level: number) : boolean {
		switch (level) {
			case 1: return true;
			case 2: return true;
			default: return false;
		}
	}
}
