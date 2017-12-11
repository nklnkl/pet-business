import { Session } from 'pet-entity';
import * as Moment from 'moment';
export { SessionService };

class SessionService {

  /**
  * May return a Session if creation was successful.
  *
  * **Reject codes**
	*/
  public static create(accountId: string) : Promise<Session> {
    return new Promise((resolve, reject) => {
      let session: Session = new Session();
      session.setAccountId(accountId);
      session.setCreated(Moment().valueOf());
      session.setUpdated(Moment().valueOf());
      resolve(session);
    });
  }

}
