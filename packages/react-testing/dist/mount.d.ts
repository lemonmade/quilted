import * as React from 'react';
import { IfAllOptionalKeys } from '@shopify/useful-types';
import { Root } from './root';
import { Element } from './element';
export { Root, Element };
export declare function mount<Props>(element: React.ReactElement<Props>): Root<Props>;
declare type AfterMountOption<MountOptions extends object, Context extends object, Async extends boolean> = Async extends true ? {
    afterMount(wrapper: CustomRoot<unknown, Context>, options: MountOptions): PromiseLike<void>;
} : {
    afterMount?(wrapper: CustomRoot<unknown, Context>, options: MountOptions): void;
};
declare type ContextOption<MountOptions extends object, Context extends object> = IfAllOptionalKeys<Context, {
    context?(options: MountOptions): Context;
}, {
    context(options: MountOptions): Context;
}>;
export declare type CustomMountOptions<MountOptions extends object = {}, Context extends object = {}, Async extends boolean = false> = {
    render(element: React.ReactElement<any>, context: Context, options: MountOptions): React.ReactElement<any>;
} & ContextOption<MountOptions, Context> & AfterMountOption<MountOptions, Context, Async>;
declare type CustomMount<MountOptions extends object, Context extends object, Async extends boolean> = IfAllOptionalKeys<MountOptions, <Props>(element: React.ReactElement<any>, options?: MountOptions) => CustomMountResult<Props, Context, Async>, <Props>(element: React.ReactElement<any>, options: MountOptions) => CustomMountResult<Props, Context, Async>>;
declare type CustomMountResult<Props, Context extends object, Async extends boolean> = Async extends true ? Promise<CustomRoot<Props, Context>> : CustomRoot<Props, Context>;
export declare class CustomRoot<Props, Context extends object> extends Root<Props> {
    readonly context: Context;
    constructor(tree: React.ReactElement<Props>, context: Context, resolve: (element: Element<unknown>) => Element<unknown> | null);
}
export declare function createMount<MountOptions extends object = {}, Context extends object = {}, Async extends boolean = false>({ render, context: createContext, afterMount, }: CustomMountOptions<MountOptions, Context, Async>): CustomMount<MountOptions, Context, Async>;
