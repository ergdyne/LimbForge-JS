import { ViewEntity, ViewColumn, Connection} from "typeorm"
import {GroupState} from './ViewGroupState'
import {UserGroupState} from './ViewUserGroupState'
import { User } from "./User";

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("ugs.userId", "userId")
    .addSelect("ugs.groupId","groupId")
    .addSelect("ugs.access","access")
    .addSelect("gs.attribute","attribute")
    .addSelect("gs.value","value")
    .addSelect("gs.type","type")
    .addSelect("u.email","email")
    .from(UserGroupState,"ugs")
    .leftJoin(GroupState,"gs", "gs.groupId = ugs.groupId")
    .leftJoin(User,"u", "u.id = ugs.userId")
})
export class FullUserGroup{
  @ViewColumn()
  userId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  email:string

  @ViewColumn()
  access: string

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}
