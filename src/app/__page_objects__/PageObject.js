export default class PageObject {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  async updateAsync() {
    await flushPromises()
    this.wrapper.update()
  }

  text() {
    return this.wrapper.text()
  }

  matchSnapshot() {
    expect(this.wrapper.html()).toMatchSnapshot()
  }
}
