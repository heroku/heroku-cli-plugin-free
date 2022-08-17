import {expect, test} from '@oclif/test'

describe('free', () => {
  test
  .stdout()
  .command(['free'])
  .it('runs free', ctx => {
    expect(ctx.stdout).to.contain('Apps with Free Dynos & Data')
  })
})
