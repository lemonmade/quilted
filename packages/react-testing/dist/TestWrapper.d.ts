import * as React from 'react';
interface State<ChildProps> {
    props?: Partial<ChildProps>;
}
interface Props {
    children: React.ReactElement<any>;
}
export declare class TestWrapper<ChildProps> extends React.Component<Props, State<ChildProps>> {
    state: State<ChildProps>;
    setProps(props: Partial<ChildProps>): void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
}
export {};
