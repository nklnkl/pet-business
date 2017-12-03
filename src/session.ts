import {Session} from 'pet-entity';
import * as Moment from 'moment';
export { SessionService };

class SessionService {

  public static create(id: string) : Promise<Session> {
    return new Promise((resolve, reject) => {
      let session: Session = new Session();
      session.setUserId(id);
      session.setCreated(Moment().valueOf());
      session.setUpdated(Moment().valueOf());
      resolve(session);
    });
  }

}
