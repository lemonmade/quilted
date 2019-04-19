import { Node } from './types';
export declare function assertIsNode(node: unknown, { expectation, isNot }: {
    expectation: string;
    isNot: boolean;
}): void;
export declare function diffPropsForNode(node: Node<any>, props: object, { expand }: {
    expand?: boolean | undefined;
}): string | null;
