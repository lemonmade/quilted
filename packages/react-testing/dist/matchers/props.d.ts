/// <reference types="jest" />
import { Node } from './types';
export declare function toHaveReactProps<Props>(this: jest.MatcherUtils, node: Node<Props>, props: Partial<Props>): {
    pass: boolean;
    message: () => string;
};
