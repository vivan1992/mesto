export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, currentUserId) {
    items.reverse().forEach(item => {
      this._renderer(item, currentUserId);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
