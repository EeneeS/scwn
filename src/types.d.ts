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
        color: ((e: Event) => void) | null;
      }
    }
  };

  type Change = {
    id: string;
    el: HTMLElement;
    type: string | "text-value" | "text-size" | "text-weight" | "text-color"; // change this
    original: string;
    newValue: string;
  };

  type Widget = {
    isOpen: boolean;
    selector: Selector;
    editor: Editor;
  };

  type Options = {
    position: string;
    publishTargets?: {
      slack?: {
        channel: string;
      },
      github?: {
        url: string;
      },
    }
  }

  type State = {
    widget: Widget;
    options: Options;
    loginTokens: {
      github?: string;
    }
  };
}
