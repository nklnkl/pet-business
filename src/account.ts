import {Account} from 'pet-entity';
import * as validator from 'validator';
export {AccountService};
class AccountService {

	public createCustomer (email: string, password: string, name: string, birthday: number, address: string) : Account {
		let account: Account = new Account();
		if(!validator.isEmail(email))
			return 1;

		else
			account.setEmail(email);

		if (password.length<7 || password.length>10)
			return 2;

		else
			account.setPassword(password);

		account.setName(name);
		account.setBirthDate(birthday);
		account.setAddress(address);
		account.setLevel(0);
		return account;
	}

	public createAdmin (email: string, password: string, name: string, birthday: number, address: string) : Account | number {
		let account: Account = new Account();

		if(!validator.isEmail(email))
			return 1;

		else
			account.setEmail(email);

		if (password.length<7 || password.length>10)
			return 2;

		else
			account.setPassword(password);

		account.setName(name);
		account.setBirthDate(birthday);
		account.setAddress(address);
		account.setLevel(1);
		return account;
	}
}
