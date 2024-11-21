export { }

declare global {

  type Selector = {
    isActive: boolean;
    selectedElement: HTMLElement | null;
    selectElementListener: ((e: MouseEvent) => void) | null;
    keyDownListener: ((e: KeyboardEvent) => void) | null;
  };

  type Editor = {
    changes: Change[];
    textEditor: {
      listeners: {
        value: ((e: Event) => void) | null;
        size: ((e: Event) => void) | null;
        color: ((e: Event) => void) | null;
        weight: ((e: Event) => void) | null;
      }
    }
  };

  type Change = {
    id: string;
    el: HTMLElement;
    type: string;
    value: string;
  };

  type Widget = {
    isOpen: boolean;
    selector: Selector;
    editor: Editor;
  };

  type State = {
    widget: Widget;
    options: Object;
  };
}
