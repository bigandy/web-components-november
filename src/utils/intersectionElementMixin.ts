import { LitElement } from "lit";
import { property } from "lit/decorators.js";

type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * `IntersectionElementSuper`
 * `Wiring to provide basic IntersectionObserver support to any web component`
 */
export const IntersectionElementMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  // SuperClass so we can write any web component library / base class
  class IntersectionElementMixinClass extends superClass {
    // listen for this to be true in your element
    @property()
    elementVisible = false;

    // margin from root element
    @property()
    IORootMargin = "0px";

    // wait till at least 90% of the item is visible to claim visible
    @property()
    IOVisibleLimit = 0.9;

    // drop the observer once we are visible?
    @property()
    IORemoveOnVisible = false;

    // the root element
    @property()
    IORootElement = undefined;

    // AHTODO: How to type this properly???
    @property({ type: IntersectionObserver })
    intersectionObserver = null;

    /**
     * HTMLElement specification
     */
    connectedCallback() {
      super.connectedCallback();

      // setup the intersection observer, only if we are not visible
      if (!this.elementVisible) {
        // @ts-ignore
        this.intersectionObserver = new IntersectionObserver(
          this.handleIntersectionCallback.bind(this),
          {
            root: this.IORootElement,
            rootMargin: "0px",
            threshold: this.IOVisibleLimit,
          }
        );
        // @ts-ignore
        this.intersectionObserver.observe(this);
      }
    }
    /**
     * HTMLElement specification
     */
    disconnectedCallback() {
      // if we have an intersection observer, disconnect it
      if (this.intersectionObserver) {
        // @ts-ignore
        this.intersectionObserver.disconnect();
      }
      super.disconnectedCallback();
    }
    /**
     * Very basic IntersectionObserver callback which will set elementVisible to true
     */
    handleIntersectionCallback(entries: any) {
      for (let entry of entries) {
        let ratio = Number(entry.intersectionRatio).toFixed(2);
        // ensure ratio is higher than our limit before trigger visibility
        if (Number(ratio) >= this.IOVisibleLimit) {
          this.elementVisible = true;

          // remove the observer if we've reached our target of being visible
          if (this.IORemoveOnVisible) {
            // @ts-ignore
            this.intersectionObserver.disconnect();
          }
        } else {
          this.elementVisible = false;
        }
      }
    }
  }

  return IntersectionElementMixinClass as T;
};
