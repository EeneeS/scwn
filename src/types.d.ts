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
    undoStack: Change[];
    redoStack: Change[];
    textEditor: {
      listeners: {
        value: ((e: Event) => void) | null;
        size: ((e: Event) => void) | null;
        sizeDecr: ((e: Event) => void) | null;
        sizeIncr: ((e: Event) => void) | null;
        bold: ((e: Event) => void) | null;
        italic: ((e: Event) => void) | null;
        underline: ((e: Event) => void) | null;
        color: ((e: Event) => void) | null;
      }
    },
    imageEditor: {
      listeners: {
        width: ((e: Event) => void) | null;
        height: ((e: Event) => void) | null;
        aspectRatio: ((e: Event) => void) | null;
      },
    }
  };

  type Change = {
    id: string;
    el: HTMLElement;
    type: ChangeType;
    original: string;
    newValue: string;
  };

  type ChangeType = "text-value" | "text-size" | "text-weight" | "text-color" | "text-style" | "text-decoration" | "image-width" | "image-height";

  type Widget = {
    isOpen: boolean;
    selector: Selector;
    editor: Editor;
    historyOpen: boolean;
  };

  type Options = {
    position: string;
    projectId: string;
  }

  type State = {
    widget: Widget;
    options: Options;
  };
}
