import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import "./search.css";

import {Form , FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends Component{
    constructor(){
        super();
        this.state = {
         query: "",
         items: []
        };
        this.search = this.search.bind(this);
    }

    search = (e) => {
        e.preventDefault();
        let query = {name: this.state.query};
        console.log(query);
        ApiService.seachfandom(query)
        .then(res => {
               console.log("Success");
               let data = res.data;
               if (data){
                   this.state.items = data
                   console.log(data);
               }
               else{
                   alert("Not found");
               }
           })
           .catch(error => {
               console.log("Fail");
           });
   };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

     render() {
          return (
            <div className="search">
                <div className="bar">
                    <FormControl type="text" placeholder="Search" onChange={this.onChange} name="query"/>
                    <Button variant="outline-success" onClick={this.search} >Search</Button>
                </div>
                <form>
                    <ul>
                        {this.state.items.map(item => (
                            <li id={item.fandomId}><a href={"/fandom/" + item.fandomId} >{item.fandomName}</a></li>
                        ))}
                    </ul>
                </form>
            </div>
          );
     }
}

export default Search;