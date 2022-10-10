import React, { Component } from 'react'

export default class ItemComponent extends Component {
    state = {
        id: "",
        name: "",
        idUpdate: "",
        nameUpdate: "",
        textSearch: "",
        img: [],
        prevImg: []
    }
    handleImg = (file) => {
        this.setState({img: file})
        let arrImg = []
        for( let i = 0; i < file.length; i++) {
            let url = URL.createObjectURL(file[i])
            arrImg.push(url)
        }
        this.setState({ prevImg : arrImg})
    }
    render() {
        let listItem = []
        if (this.props.items) {
            listItem = this.props.items.map((item, key) => {
                return (
                    <tr key={key}>
                        <th>{item._id}</th>
                        <th>{item.name}</th>
                        <th>{item.img.map((value, index) => {
                            return (
                                <div key={index}>
                                    <img src={value } width="90" height="60" alt='655'></img>
                                    <button
                                        style={{visibility: item.img.length === 1? "hidden" : "visible"}}
                                        onClick={() => this.props.deleteOneItem({id: item._id, index: index })}
                                    >X</button>    
                                </div>
                            )
                        })}</th>

                        <th>
                            <button
                                onClick={() => this.props.deleteItem({ id: item._id })}
                            >DELETE</button>
                        </th>
                        <th>
                            <button
                                onClick={() => this.setState({ idUpdate: item._id, nameUpdate: item.name, prevImg: item.img })}
                            >EDIT</button>
                        </th>
                    </tr>
                )
            })
        }

        let paginate = []
        for (let i = 1; i <= this.props.totalPage; i++) {
            let button = (
                <button
                    key={i}
                    style={{ backgroundColor: this.props.activePage === i ? 'red' : null }}
                    onClick={() => {
                        this.props.textSearch ? this.props.searchItem({ textSearch: this.props.textSearch, activePage: i }) : this.props.paginateItem(i)
                    }}
                >{i}</button>
            )
            paginate.push(button)
        }
        return (
            <div>
                <input
                    type="file" multiple
                    onChange={(e) => this.handleImg(e.target.files)}
                ></input>
                <div>
                    {this.state.prevImg.map((item, key) => {
                        return (
                            <div key={key}>
                                <img src={item } width="90" height="60" alt='655'></img>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <input
                        onChange={(e) => this.setState({name : e.target.value})}
                    ></input>
                    <button
                    onClick={() => this.state.name ? this.props.addItem({name : this.state.name, img: this.state.img}) : alert("anj asd")} 
                    >ADD</button>
                </div>
                <div>
                    <input
                        onChange={(e) => this.setState({nameUpdate : e.target.value})}
                        value = {this.state.nameUpdate}
                    ></input>
                    <button
                    onClick={() => this.state.nameUpdate ? this.props.updateItem({name : this.state.nameUpdate, img: this.state.img, id: this.state.idUpdate}) : alert("anj asd")} 
                    >Update</button>
                </div>
                <div>
                    <input
                        onChange={(e) => this.setState({textSearch : e.target.value})}
                    ></input>
                    <button
                    onClick={() => this.state.textSearch ? this.props.searchItem({textSearch : this.state.textSearch, activePage: 1}) : alert("anj asd")} 
                    >Search</button>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>IMG</th>
                                <th>Note</th>
                            </tr>
                            {listItem}
                        </thead>
                    </table>
                </div>
                {paginate}
            </div>
        )
    }
}
