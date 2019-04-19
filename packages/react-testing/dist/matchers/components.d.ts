/// <reference types="jest" />
import { ComponentType } from 'react';
import { Props } from '@shopify/useful-types';
import { Node } from './types';
export declare function toContainReactComponent<Type extends string | ComponentType<any>>(this: jest.MatcherUtils, node: Node<unknown>, type: Type, props?: Partial<Props<Type>>): {
    pass: boolean;
    message: () => string;
};
