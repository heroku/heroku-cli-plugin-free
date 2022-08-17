import {Command, flags} from '@heroku-cli/command'
import * as Heroku from '@heroku-cli/schema'
import {cli} from 'cli-ux'

interface FreeInfo {
  dyno: boolean;
  postgresql: boolean;
  redis: boolean;
}

type Entry = {
  name: string;
  free: FreeInfo;
}

export default class FreeCommand extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ oclif-example hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async freeDynos(): Promise<Array<Entry>> {
    const headers = {Accept: 'application/vnd.heroku+json; version=3.process-tier'}
    const response = await this.heroku.get<Array<Heroku.App>>('/apps', {headers})
    const apps = response.body
    return apps.filter(app => app.process_tier === 'free').map(app => {
      return {
        name: app.name,
        free: {
          dyno: true,
          postgresql: false,
          redis: false,
        },
      } as Entry
    })
  }

  async freeData(): Promise<Array<Entry>> {
    const headers = {Accept: 'application/vnd.heroku+json; version=3.heroku-addons-filter'}
    const response = await this.heroku.get<Array<Heroku.AddOn>>('/addons?slug%5B%5D=heroku-postgresql&slug%5B%5D=heroku-redis', {headers})
    const addons = response.body
    return addons.filter(addon => {
      return addon.addon_service && addon.plan && addon.plan.name !== undefined ? /heroku-(postgresql|redis):(dev|hobby-dev|test)/.exec(addon.plan.name) : false
    }).map(addon => {
      return {
        name: addon.app!.name,
        free: {
          dyno: false,
          // filtered for this above
          postgresql: addon.addon_service!.name === 'heroku-postgresql',
          redis: addon.addon_service!.name === 'heroku-redis',
        },
      } as Entry
    })
  }

  async run() {
    // const {flags} = this.parse(FreeCommand)
    cli.action.start('Fetching data')

    const freeDynos = await this.freeDynos()
    const freeData = await this.freeData()

    // aggregate data
    const data = new Map<string, Entry>()
    for (const entry of [...freeDynos, ...freeData]) {
      let result = data.get(entry.name)
      if (result) {
        if (entry.free.dyno) result.free.dyno = true
        if (entry.free.postgresql) result.free.postgresql = true
        if (entry.free.redis) result.free.redis = true
      } else {
        result = entry
      }

      data.set(entry.name, result)
    }

    cli.action.stop()

    cli.styledHeader('Apps with Free Dynos & Data')
    cli.table([...data.values()], {
      name: {
        get: row => row.name,
      },
      dyno: {
        get: row => row.free.dyno,
      },
      postgresql: {
        get: row => row.free.postgresql,
      },
      redis: {
        get: row => row.free.redis,
      },
    })
  }
}
