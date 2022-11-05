/**
 * `IntersectionElementSuper`
 * `Wiring to provide basic IntersectionObserver support to any web component`
 */
const IntersectionElementMixin = function (SuperClass: any) {
  // SuperClass so we can write any web component library / base class
  return class extends SuperClass {
    /**
     * Constructor
     */
    constructor() {
      super();
      // listen for this to be true in your element
      this.elementVisible = false;
      // margin from root element
      this.IORootMargin = "0px";
      // wait till at least 90% of the item is visible to claim visible
      this.IOVisibleLimit = 0.9;
      // drop the observer once we are visible
      this.IORemoveOnVisible = false;
      // delay in observing, performance reasons for minimum at 100
      // this.IODelay = 100;
      this.IORootElement = null;
    }
    /**
     * HTMLElement specification
     */
    connectedCallback() {
      super.connectedCallback();

      // setup the intersection observer, only if we are not visible
      if (!this.elementVisible) {
        this.intersectionObserver = new IntersectionObserver(
          this.handleIntersectionCallback.bind(this),
          {
            root: this.IORootElement,
            rootMargin: "0px",
            threshold: 1.0,
          }
        );
        this.intersectionObserver.observe(this);

        console.log(this.intersectionObserver);
      }
    }
    /**
     * HTMLElement specification
     */
    disconnectedCallback() {
      // if we have an intersection observer, disconnect it
      if (this.intersectionObserver) {
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
        if (ratio >= this.IOVisibleLimit) {
          this.elementVisible = true;
          // remove the observer if we've reached our target of being visible
          if (this.IORemoveOnVisible) {
            console.log("removing");
            this.intersectionObserver.disconnect();
          }
        } else {
          this.elementVisible = false;
        }
      }
    }
  };
};

export { IntersectionElementMixin };
