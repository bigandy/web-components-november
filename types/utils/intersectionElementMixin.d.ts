/**
 * `IntersectionElementSuper`
 * `Wiring to provide basic IntersectionObserver support to any web component`
 */
declare const IntersectionElementMixin: (SuperClass: any) => {
    new (): {
        [x: string]: any;
        /**
         * HTMLElement specification
         */
        connectedCallback(): void;
        /**
         * HTMLElement specification
         */
        disconnectedCallback(): void;
        /**
         * Very basic IntersectionObserver callback which will set elementVisible to true
         */
        handleIntersectionCallback(entries: any): void;
    };
    [x: string]: any;
};
export { IntersectionElementMixin };
