import Service from '@ember/service';

export default class TabsService extends Service {
  constructor(...args) {
    super(...args);
  }

  async getAll() {
    return (this.tabs = await browser.tabs.query({
      windowId: await this.getWindowId()
    }));
  }

  async getWindowId() {
    if (!this._window) {
      this._window = await browser.windows.getCurrent();
    }

    return this._window.id;
  }
}
