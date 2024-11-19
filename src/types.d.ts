export { }

declare global {

  type Selector = {
    isActive: boolean;
    selectedElement: HTMLElement | null;
    listener: ((e: MouseEvent) => void) | null;
  };

  type Widget = {
    isOpen: boolean;
    selector: Selector;
    editor: {
      textEditor: {
        fontSizeListener: any | null;
        colorListener: any | null;
      };
    };
  };
  type State = {
    widget: Widget
  }

}
