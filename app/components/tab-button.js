import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class TabButtonComponent extends Component {
  tabButtonId = `TabButton${guidFor(this)}`;

  tabButtonMenuId = `TabButtonMenu${guidFor(this)}`;

  @tracked buttonElement;

  @tracked showContextmenu = false;

  @action
  async activateTab() {
    if (!this.tab.active) {
      browser.tabs.update(this.tab.id, { active: true });
    }
  }

  @action
  closeContextmenu() {
    this.showContextmenu = false;
  }

  @action
  contextMenu(e) {
    if (e) {
      e.preventDefault();
    }
    this.showContextmenu = true;
  }

  @action
  attachToggle(element) {
    this.buttonElement = element;
  }

  @action
  closeTab() {
    browser.tabs.remove(this.tab.id);
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
