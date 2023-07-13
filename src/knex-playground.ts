import knex from 'knex'

const knexInstance = knex({
  client: 'sqlite3',
  connection: {
    filename: './db'
  }
})

knexInstance.on('query', (queryData: any) => {
  console.log('query executed: ', queryData.sql)
})

const addJoin = (withBuilder: any) => {
  withBuilder.leftOuterJoin('child', 'child.id', 'parent.child')
  console.log('2. - joins added')
}

export const knexPlayground = async () => {
  const query = knexInstance
    .with('cte', withBuilder => {
      console.log('1. - cte function eval started')
      withBuilder.select('*').from('users')
      // uncomment to make joins work
      // addJoin(withBuilder)

      withBuilder.where(whereBuilder => {
        // will eval joins too late (comment to make joins work)
        addJoin(withBuilder)
        whereBuilder.where('id', 1)
      })

      console.log('3. - cte function eval finished')
    })
    .from('cte')

  await query.catch(() => {})
}
