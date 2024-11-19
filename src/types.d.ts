export { }

declare global {

  type Selector = {
    isActive: boolean,
    selectedElement: HTMLElement | null,
  }

  type Widget = {
    isOpen: boolean,
    selector: Selector
  }

  type State = {
    widget: Widget
  }

}
