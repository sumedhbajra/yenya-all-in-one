import React from "react";

class FoodApp extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      color: "Red",
      height: "5'8 feet",
      message: "This car is better",
      philosophy: "Solzhenitsyn",
      isOpen: true
    };

    this.buttonOnPress = this.buttonOnPress.bind(this);
    this.buttonOnPress1 = this.buttonOnPress1.bind(this);
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       color: "Yellow",
  //     })
  //   }, 1000)
  // }

  // componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
  //   setTimeout(() => {
  //     this.setState({ message: "component updated" })
  //   }, 1000)
  // }

  componentWillUnmount(): void {
    alert("The component is about to be unmounted.")
    setTimeout(() => {
      this.setState({ message: "component is removed" })
    }, 1000)
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const attributes: { color: string, height: string, message: string, philosophy: string } = {
      color: state.color,
      height: state.height,
      message: state.message,
      philosophy: state.philosophy,
    }
    return attributes
  }



  buttonOnPress() {
    this.setState({ color: "Blue" });
  }

  buttonOnPress1() {
    this.setState({ isOpen: false })
  }

  // shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
  //   return false;
  // }

  getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>) {
    console.log({ prevProps });
    console.log({ prevState });
    return null;
  }



  render() {
    let myComponent;
    if (this.state.isOpen) {
      myComponent = <ChildComponent />
    }
    const data = JSON.stringify(this.state);
    return (
      <div>
        <h1>This is class based component</h1>
        <div>
          <span>{data}</span>
        </div>

        {myComponent}
        <button className="mt-10 border-2 px-4 py-2" onClick={this.buttonOnPress}>Press</button>
        <button className="mt-10 border-2 px-4 py-2" onClick={this.buttonOnPress1}>Press 1</button>
      </div >
    );
  }
}

export default FoodApp;


class ChildComponent extends React.Component {

  componentWillUnmount(): void {
    alert("This component is about to unmount");
  }

  render(): React.ReactNode {
    return <div>Children example</div>
  }
}