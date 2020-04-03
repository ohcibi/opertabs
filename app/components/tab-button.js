import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

export default class TabButtonComponent extends Component {
  @action
  async activateTab() {
    if (!this.tab.active) {
      browser.tabs.update(this.tab.id, { active: true });
    }
  }

  constructor(...args) {
    super(...args);
    this.windowId = this.tab.windowId;
    browser.tabs.onActivated.addListener(
      ({ tabId, previousTabId, windowId }) => {
        if (
          windowId === this.windowId &&
          (tabId === this.tab.id || previousTabId === this.tab.id)
        ) {
          console.log(tabId);
          this.updateTab();
        }
      }
    );
  }

  async updateTab(tabId = this.tab.id) {
    this.tab = await browser.tabs.get(tabId);
  }

  @computed('tab')
  get tab() {
    return this.args.tab;
  }

  set tab(tab) {
    return (this._tab = tab);
  }
}
