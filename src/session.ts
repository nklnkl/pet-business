import {Session} from 'pet-entity';
import * as Moment from 'moment';
export { SessionService };

class SessionService {

  public static create(id: string) : Session {
    let session: Session = new Session();
    session.setUserId(id);
    session.setCreated(Moment().valueOf());
    session.setUpdated(Moment().valueOf());
    return session;
  }

}
