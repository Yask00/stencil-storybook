import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'button-wrapper',
  // TODO: multiple imports for scoped and global
  styleUrl: 'button-wrapper.scss',
  shadow: true,
})
export class MyComponent {

  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }


  public passButtonMethodFromMyComponent(): void {
    console.log('passed click from my-component to my-button');
  }

  render() {
    return (
      <div>
        <div class="dismiss p-4">DISMISS PADDING 4</div>
        <slot />
        Hello, World! I'm {this.getText()}
        <hr/>
        <div>
          wrapping buttons in my-component
          <my-button passedClick={this.passButtonMethodFromMyComponent} type="primary">Primary</my-button>
          <my-button passedClick={this.passButtonMethodFromMyComponent} type="secondary">Secondary</my-button>
        </div>
      </div>
    );
  }
}
