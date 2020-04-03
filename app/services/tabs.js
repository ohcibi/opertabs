import Service from '@ember/service';
import { action } from '@ember/object';

export default class TabsService extends Service {
  @action
  async browserAction() {
    await browser.sidebarAction.toggle();
  }

  constructor(...args) {
    super(...args);

    browser.browserAction.onClicked.addListener(this.browserAction);
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
