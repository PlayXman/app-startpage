class TodoItem {
  constructor() {
    /** @type {number} */
    this.id = 0;
    /** @type {string} @private */
    this._text = "";
    /** @type {string} */
    this.createDate = "";
    /** @type {string} @private */
    this._dueDate = "";
    /** @type {number} */
    this.projectId = 0;
  }

  /**
   * @param {string} text
   */
  set text(text) {
    this._text = text;
  }

  /**
   * @returns {string}
   */
  get text() {
    let text = this._text;
    text = this._formatUrlMarkdown(text);
    text = text.replace(/\*\*([^\s][^*]+[^\s])\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__([^\s][^_]+[^\s])__/g, "<strong>$1</strong>");
    text = text.replace(/\*([^\s][^*]+[^\s])\*/g, "<em>$1</em>");
    text = text.replace(/_([^\s][^_]+[^\s])_/g, "<em>$1</em>");
    text = text.replace(/```([^\s][^`]+[^\s])```/g, "<code>$1</code>");
    text = text.replace(/`([^\s][^`]+[^\s])`/g, "<code>$1</code>");

    return text;
  }

  /**
   * @param {string} date
   */
  set dueDate(date) {
    this._dueDate = date;
  }

  /**
   * @returns {string} "today", "yesterday", date for others
   */
  get dueDate() {
    const date = new Date(this._dueDate);
    const now = new Date();

    let d = "";
    let diff = now.getFullYear() - date.getFullYear();
    diff += now.getMonth() - date.getMonth();
    diff *= 10;
    diff += now.getDate() - date.getDate();

    if (diff === 0) {
      d = "today";
    } else if (diff === 1) {
      d = "yesterday";
    } else {
      d = `${date.getDate()}.${date.getMonth() + 1}.`;
    }

    return d;
  }

  /**
   * @returns {boolean} True for past and today date
   */
  isDue() {
    const now = new Date();
    const date = new Date(this._dueDate);

    return now >= date;
  }

  /**
   * @param {string} text
   * @returns {string}
   * @private
   */
  _formatUrlMarkdown(text) {
    let result = text.replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1");

    let m;
    let lastIndex = 0;
    let newText = "";
    const regex = /https?:\/\/([^\s]+)/g;
    while ((m = regex.exec(result)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      newText += result.slice(lastIndex, m.index);
      newText += m[1].substr(0, 15) + "...";

      lastIndex = regex.lastIndex;
    }

    if (newText.length) {
      result = newText;
    }

    return result;
  }
}

export default TodoItem;
