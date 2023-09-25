export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }
  //when the component is added in DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }
  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
            <h3>${category.name}<h3>
            <ul class="category"></ul>
            `;
        this.root.querySelector("#menu").appendChild(liCategory);
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "loading ...";
    }
  }
}

customElements.define("menu-page", MenuPage);
