import * as React from 'react';
import { Props as PropsForComponent, Arguments, MaybeFunctionReturnType as ReturnType } from '@shopify/useful-types';
import { Tag, FunctionKeys } from './types';
export declare type Predicate = (element: Element<unknown>) => boolean;
declare type Root = import('./root').Root<any>;
interface Tree<Props> {
    tag: Tag;
    type: string | React.ComponentType<any> | null;
    props: Props;
    instance?: any;
}
export declare class Element<Props> {
    private readonly tree;
    private readonly allChildren;
    readonly root: Root;
    readonly props: Props;
    readonly type: string | React.ComponentClass<any, any> | React.FunctionComponent<any> | null;
    readonly isDOM: boolean;
    readonly instance: any;
    readonly children: Element<unknown>[];
    readonly descendants: Element<unknown>[];
    readonly domNodes: HTMLElement[];
    readonly domNode: HTMLElement | null;
    private readonly elementChildren;
    private readonly elementDescendants;
    constructor(tree: Tree<Props>, allChildren: (Element<unknown> | string)[], allDescendants: (Element<unknown> | string)[], root: Root);
    data(key: string): unknown;
    prop<K extends keyof Props>(key: K): Props[K];
    text(): string;
    html(): string;
    is<Type extends React.ComponentType<any> | string>(type: Type): this is Element<PropsForComponent<Type>>;
    find<Type extends React.ComponentType<any> | string>(type: Type, props?: Partial<PropsForComponent<Type>>): Element<PropsForComponent<Type>> | null;
    findAll<Type extends React.ComponentType<any> | string>(type: Type, props?: Partial<PropsForComponent<Type>>): Element<PropsForComponent<Type>>[];
    findWhere(predicate: Predicate): Element<unknown> | null;
    findAllWhere(predicate: Predicate): Element<unknown>[];
    trigger<K extends FunctionKeys<Props>>(prop: K, ...args: Arguments<Props[K]>): ReturnType<NonNullable<Props[K]>>;
    triggerKeypath<T = unknown>(keypath: string, ...args: unknown[]): T;
    toString(): string;
}
export {};
