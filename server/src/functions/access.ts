import { FullUserGroup } from "../entity/ViewFullUserGroup"
import _ from 'underscore'

//Used to determine if user has sufficient access rites to a group.
function groupAccess(requiredLevels: string[], viewGroups: FullUserGroup[]) {
  return _.uniq(viewGroups.filter(vg => requiredLevels.includes(vg.access)).map(vg => vg.groupId))
}

export {groupAccess}