const groupColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `name`, name: `Name`, type: `string` },
  { accessor: `description`, name: `About`, type: `string` }
]

const groupInputs = [
  { accessor: `name`, name: `Group Name`, type: `string`, inputType: `text`, validation: { required: true } },
  { accessor: `description`, name: `About`, type: `string`, inputType: `text`}
]


const usersColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `email`, name: `Email`, type: `string` },
  { accessor: `siteAccess`, name: `Level`, type: `string` },
]

const usersGroupColHeaders = [
  { accessor: `id`, name: ``, type: `id` },
  { accessor: `email`, name: `Email`, type: `string` },
  { accessor: `groupAccess`, name: `Level`, type: `string` },
]

//Col headers that show a user's groups
const userGroupsColHeaders =
  [
    { Header: 'Group', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Access', accessor: 'groupAccess' },
  ]

export {
  groupColHeaders,
  groupInputs,
  usersColHeaders,
  usersGroupColHeaders,
  userGroupsColHeaders
}