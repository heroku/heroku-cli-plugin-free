import {expect, test} from '@oclif/test'

describe('apps:free', () => {
  test
  .stdout()
  .command(['apps:free'])
  .it('runs apps:free', ctx => {
    expect(ctx.stdout).to.contain('Apps with Free Dynos & Data')
  })
})
