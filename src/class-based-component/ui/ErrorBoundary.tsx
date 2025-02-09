import { ReactNode } from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render(): ReactNode {
        return this.props.children
    }
}