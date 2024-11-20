export { }

declare global {

  type Selector = {
    isActive: boolean;
    selectedElement: HTMLElement | null;
    selectElementListener: ((e: MouseEvent) => void) | null;
  };

  type Editor = {
    textEditor: {
      listeners: {
        size: ((e: Event) => void) | null
        color: ((e: Event) => void) | null
      }
    }
  };

  type Widget = {
    isOpen: boolean;
    selector: Selector;
    editor: Editor;
  };

  type State = {
    widget: Widget
  };


}
