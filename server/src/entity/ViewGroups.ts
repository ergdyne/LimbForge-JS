import { ViewEntity, ViewColumn, Connection} from "typeorm"
import {GroupState} from './ViewGroupState'
import {UserGroupState} from './ViewUserGroupState'

//Results in an entry for each userID, groupId, and attribute, which must be merged into a single group-access object.
@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("ugs.userId", "userId")
    .addSelect("ugs.groupId","groupID")
    .addSelect("ugs.access","access")
    .addSelect("gs.attribute","attribute")
    .addSelect("gs.value","value")
    .addSelect("gs.type","type")
    .from(UserGroupState,"ugs")
    .leftJoin(GroupState,"gs", "gs.groupId = ugs.groupId")
})
export class ViewGroups{
  @ViewColumn()
  userId: number

  @ViewColumn()
  groupId: number

  @ViewColumn()
  access: string

  @ViewColumn()
  attribute: string

  @ViewColumn()
  value: string

  @ViewColumn()
  type: string
}
