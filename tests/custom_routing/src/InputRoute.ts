import {
  type LocationValue,
  type NavigationOptions,
  Route,
} from "../../../index.ts";

export class InputRoute extends Route {
  inputId: string;
  constructor(inputId: string, url?: LocationValue) {
    super(url);
    this.inputId = inputId;
  }
  _init() {
    let handleInput = (event: KeyboardEvent) => {
      let element = event.target;

      if (
        element instanceof HTMLInputElement &&
        element.id === this.inputId &&
        event.key === "Enter"
      ) {
        event.preventDefault();
        this.navigate({ href: element.value });
      }
    };

    let start = () => {
      window.addEventListener("keydown", handleInput);
    };

    let stop = () => {
      window.removeEventListener("keydown", handleInput);
    };

    this.on("start", start);
    this.on("stop", stop);
    start();
  }
  _getElement() {
    return document.querySelector<HTMLInputElement>(`#${this.inputId}`);
  }
  _transition(options?: NavigationOptions) {
    let href = options?.href;

    if (typeof window === "undefined" || href === undefined) return;

    let input = this._getElement();

    if (input && input.value !== href) input.value = href;
  }
  _complete() {
    // Do nothing for now. Can be used to emulate the view container
    // scrolling to the top or to the element specified by the URL fragment
    // after the navigation is complete.
  }
  toValue(url?: LocationValue) {
    if (url === undefined)
      return typeof window === "undefined"
        ? ""
        : (this._getElement()?.value ?? "");

    return String(url);
  }
}
