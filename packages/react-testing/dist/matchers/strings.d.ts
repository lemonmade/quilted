/// <reference types="jest" />
import { Node } from './types';
export declare function toContainReactText<Props>(this: jest.MatcherUtils, node: Node<Props>, text: string): {
    pass: boolean;
    message: () => string;
};
export declare function toContainReactHtml<Props>(this: jest.MatcherUtils, node: Node<Props>, text: string): {
    pass: boolean;
    message: () => string;
};