import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  constructor() {
    this.click = this.click.bind(this);
  }

  @Prop() type: string; // primary = blue, secondary = red

  @Prop() passedClick?: () => void;

  private click(): void {
    console.log('BUTTON CLICKED');

    if (this.passedClick) {
        this.passedClick();
    }
  }

  render() {
    return (
      <button onClick={this.click} class={`text-white p-2 ${this.type === 'primary' ? 'bg-blue-600' : 'bg-red-600'}`}>
        <slot />
      </button>
    );
  }
}
