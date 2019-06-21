import { ViewEntity, ViewColumn } from "typeorm"

//patient's group is not expected to change, but this makes it allowable.
@ViewEntity({
  expression: `
    select l.aid as "userId", oa."hash" from 
    (select 
      "userId" as aid, 
      max(create_at) as latest
    from site_auth
    group by "userId"
    ) as l
    inner join site_auth as oa
    on l.aid = oa."userId" and l.latest = oa.create_at
  `
})
export class ViewSiteAuth{
  @ViewColumn()
  userId: number

  @ViewColumn()
  hash: string
}