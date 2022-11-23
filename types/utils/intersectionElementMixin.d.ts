import { LitElement } from "lit";
type Constructor<T = {}> = new (...args: any[]) => T;
/**
 * `IntersectionElementSuper`
 * `Wiring to provide basic IntersectionObserver support to any web component`
 */
export declare const IntersectionElementMixin: <T extends Constructor<LitElement>>(superClass: T) => T;
export {};
