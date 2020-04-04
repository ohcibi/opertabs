import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

export default class TabButtonComponent extends Component {
  tabButtonId = `TabButton${guidFor(this)}`;

  tabButtonMenuId = `TabButtonMenu${guidFor(this)}`;

  maskId = `TabButtonMask${guidFor(this)}`;

  @tracked buttonElement;

  @tracked showContextmenu = false;

  @tracked reloading = false;

  @equal('tab.status', 'loading') isLoading;

  @computed('tab')
  get tab() {
    return this.args.tab;
  }

  set tab(tab) {
    return (this._tab = tab);
  }

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

  @action
  async reloadTab() {
    this.reloading = true;
    await browser.tabs.reload(this.tab.id);
    this.reloading = false;
  }

  @action
  async updateTab({ tabId = this.tab.id, windowId = this.windowId } = {}) {
    if (windowId === this.windowId && tabId === this.tab.id) {
      this.tab = await browser.tabs.get(tabId);
    }
  }

  constructor(...args) {
    super(...args);
    this.windowId = this.tab.windowId;

    browser.tabs.onUpdated.addListener(this.updateTab);
    browser.tabs.onActivated.addListener(
      ({ tabId, previousTabId, windowId }) => {
        if (
          windowId === this.windowId &&
          (tabId === this.tab.id || previousTabId === this.tab.id)
        ) {
          this.updateTab();
        }
      }
    );
  }
}





























































































