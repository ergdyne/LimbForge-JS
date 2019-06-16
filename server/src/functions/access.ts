import { FullUserGroup } from "../entity/ViewFullUserGroup"
import _ from 'underscore'

function groupAccess(requiredLevels: string[], viewGroups: FullUserGroup[]) {
  return _.uniq(viewGroups.filter(vg => requiredLevels.includes(vg.access)).map(vg => vg.groupId))
}

export {groupAccess}