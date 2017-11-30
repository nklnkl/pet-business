import {Session} from 'pet-entity';
import * as moment from 'moment';
export {SessionService};
class SessionService {
public create(id: string) : Session{
let session: Session = new Session();
session.setUserId(id);
  }
}
