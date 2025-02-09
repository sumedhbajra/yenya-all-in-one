import React from "react";
import instance from "../../utils/axiosConfig";
import Modal from "../../ui/Modal";

interface FoodState {
    foodData: any[];
    showTable: boolean;
    item: ItemFormProp;
}

interface ItemFormProp {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

class AnotherFoodApp extends React.Component<{}, FoodState> {
    constructor(props: any) {
        super(props);
        this.state = {
            foodData: [],
            showTable: true,
            item: {
                id: "",
                name: "",
                category: "",
                price: 0,
                description: ""
            }
        };
        this.addFoodItem = this.addFoodItem.bind(this);
        this.loadFoodItem = this.loadFoodItem.bind(this);
        this.toggleTable = this.toggleTable.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.removeFoodItem = this.removeFoodItem.bind(this);
        this.editFoodItem = this.editFoodItem.bind(this);
    }


    async loadFoodItem() {
        try {
            console.log("first")
            const res = await instance.get('/foodList');
            this.setState({ foodData: res.data });
        } catch (error) {
            alert(`Failed to load data ${error}`);
        }
    }

    async removeFoodItem(value: any) {
        // alert('triggered')
        // alert(`${JSON.stringify(value)} + /foodList/${value.id}`)
        try {
            const res = await instance.delete(`/foodList/${value.id}`);
            // alert(JSON.stringify(res.data))
            this.setState({ foodData: this.state.foodData.filter((item) => item.id !== res.data.id) });
            // this.setState({ foodData: this.state.foodData.filter(item => item.id !== res.data.id) })
        } catch (error) {
            alert(`Failed to delete food item ${error}`)
        }
    }


    async addFoodItem(data: any) {
        const newItem = {
            id: `${Math.floor(Math.random() * 1000)}`,
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description
        }

        try {
            const response = await instance.post('/foodList', newItem);
            return response.data; // Return the newly added item
        } catch (error) {
            alert(`Failed to add food data: ${error}`);
        }
    }

    async onEditFoodItem(val: any) {
        try {
            await instance.put(`/foodList/${val.id}`, this.state.item);
            // await this.loadFoodItem();
        } catch (error) {
            alert(`Error occured ${error}.`)
        }
    }

    async editFoodItem(val: any) {
        this.setState({ item: val })
    }

    onSubmitForm = async (e: React.SyntheticEvent<EventTarget>, closeModal: any) => {
        e.preventDefault();
        if (!this.state.item.name || !this.state.item.category || !this.state.item.description || !this.state.item.price) {
            alert('Form is empty');
            return;
        }
        if (this.state.item.id) {
            await this.onEditFoodItem(this.state.item);
            this.setState({
                item: {
                    id: "",
                    name: "",
                    category: "",
                    price: 0,
                    description: ""
                }
            })
            await this.loadFoodItem();
            closeModal();
            return;
        }

        await this.addFoodItem(this.state.item);
        this.setState({
            item: {
                id: "",
                name: "",
                category: "",
                price: 0,
                description: ""
            }
        })
        await this.loadFoodItem();
        closeModal();
    }


    toggleTable() {
        this.setState({ showTable: !this.state.showTable });
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.loadFoodItem();
        }, 1000);

        // this.setState({
        //     item: {
        //         id: `${Math.floor(Math.random() * 1000)}`,
        //         name: this.state.item.name,
        //         price: this.state.item.price,
        //         category: this.state.item.category,
        //         description: this.state.item.description
        //     }
        // });
    }

    render(): React.ReactNode {
        let myTable;
        if (this.state.showTable) {
            myTable = <TableComponent foodData={this.state.foodData} removeFoodItem={this.removeFoodItem} editFoodItem={this.editFoodItem} />;
        }


        console.log(this.props, "12DATA")

        return (
            <div className="flex flex-col justify-between h-full">
                <Modal>
                    <h1 className="font-mono text-4xl">Food Registration System</h1>
                    <div>{myTable}</div>

                    <div className="flex gap-4 border-2 border-orange-200 w-full p-4 rounded-lg shadow-md bg-orange-50 justify-end">
                        <button
                            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition-all"
                            onClick={this.toggleTable}
                        >
                            {this.state.showTable ? "Hide Table" : "Show Table"}
                        </button>

                        <button onClick={() => {
                            this.setState({
                                item: {
                                    id: "",
                                    name: "",
                                    category: "",
                                    price: 0,
                                    description: ""
                                }
                            })
                        }}>
                            <Modal.Open opens="addItem">
                                <div className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition-all">
                                    Add Item
                                </div>
                            </Modal.Open>
                        </button>
                        <Modal.Window name="addItem">
                            {(onCloseModal: () => void) => (
                                <>
                                    <div>
                                        <h1 className="text-3xl font-bold text-orange-600 text-center p-3 border-b-2 border-orange-500">
                                            Product Information Form
                                        </h1>
                                        <form className="flex flex-col" onSubmit={(e) => { this.onSubmitForm(e, onCloseModal) }}>
                                            <div className="flex gap-5 w-full p-6 rounded-lg justify-around">
                                                <div className="space-y-4">
                                                    <div className="flex flex-col">
                                                        <label className="font-semibold w-52 text-gray-700">Name:</label>
                                                        <input
                                                            type="text"
                                                            className="w-96 p-3 border border-orange-400 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                                                            value={this.state.item.name}
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    item: { ...this.state.item, name: e.target.value },
                                                                });
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label className="font-semibold text-gray-700">Category:</label>
                                                        <input
                                                            type="text"
                                                            className="p-3 border border-orange-400 rounded-md focus:ring-2 focus:ring-orange-500 outline-none w-full"
                                                            value={this.state.item.category}
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    item: { ...this.state.item, category: e.target.value },
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex flex-col">
                                                        <label className="font-semibold text-gray-700">Price:</label>
                                                        <input
                                                            type="number"
                                                            className="p-3 border border-orange-400 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                                                            value={this.state.item.price}
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    item: { ...this.state.item, price: Number(e.target.value) },
                                                                });
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label className="font-semibold text-gray-700">Description:</label>
                                                        <input
                                                            type="text"
                                                            className="w-96 p-3 border border-orange-400 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                                                            value={this.state.item.description}
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    item: { ...this.state.item, description: e.target.value },
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-red-50 place-self-end mx-10 py-3 px-6 rounded-lg flex gap-5 flex-row-reverse">
                                                <button
                                                    className="bg-orange-500 text-white font-semibold rounded-md py-2 px-4 shadow-md hover:bg-orange-600 transition-all"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                                <button type="button" className="bg-red-500 text-white font-semibold rounded-md py-2 px-4 shadow-md hover:bg-red-600 transition-all" onClick={onCloseModal}>Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </Modal.Window>



                    </div>
                </Modal>
            </div>
        );
    }
}







interface TableComponentProp {
    foodData: any[];
    removeFoodItem: (value: any) => Promise<void>;
    editFoodItem: (value: any) => Promise<void>;
}

class TableComponent extends React.Component<TableComponentProp> {
    constructor(props: any) {
        super(props);
        this.state = {
            foodData: [],
        };
    }

    static getDerivedStateFromProps(props: any, state: any) {
        console.log(props, "JSJSJS")
        return {
            foodData: props.foodData,
        }
    }

    componentWillUnmount(): void {
        alert('Hiding Table')
    }

    // componentDidMount(): void {
    //     this.setState({
    //         foodData: this.props.foodData
    //     })
    // }

    render(): React.ReactNode {
        return <table className="w-full">

            <thead className="grid grid-cols-12 w-full p-2 border-2 rounded-3xl">
                <th className="col-span-1">S.N</th>
                <th className="col-span-2">Name</th>
                <th className="col-span-2">Category</th>
                <th className="col-span-2">Price</th>
                <th className="col-span-3">Description</th>
                <th className="col-span-2">Action</th>
            </thead>
            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 mt-2 border-2">
                <tbody className="grid grid-cols-12 gap-3 items-center place-items-center justify-center">
                    {this.state.foodData.map((item: any) => {
                        return <>
                            <td className="col-span-1">{item.id}</td>
                            <td className="col-span-2">{item.name}</td>
                            <td className="col-span-2">{item.category}</td>
                            <td className="col-span-2">${item.price}</td>
                            <td className="col-span-3 p-2 border-2 place-self-center
                             rounded-lg w-full shadow-sm">{item.description}</td>
                            <td className="col-span-2 flex gap-2 text-xl border-2 p-2">
                                <button onClick={() => { this.props.editFoodItem(item) }}>
                                    <Modal.Open opens="addItem">
                                        <div className="px-4 py-2 bg-green-600 hover:bg-green-500 active:bg-green-700 
                                text-white font-bold rounded-lg border-none"  >Edit</div>
                                    </Modal.Open>
                                </button>

                                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 
                                text-white font-bold rounded-lg border-none" onClick={() => this.props.removeFoodItem(item)}>Delete</button>
                            </td>
                        </>
                    })}
                </tbody>
            </div>
        </table>
    }
}

export default AnotherFoodApp;