import React, {Component} from 'react';
import {render} from 'react-dom';
import DevTr from './DevOneWeekTr'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

export default class DevTwoWeekRouter extends Component{
    render(){
        return(
            <div>
                <li>
                    <li><Link to='/DevOne' >일주</Link></li>
                    <li><Link to='/DevTwo' >이주</Link></li>
                 </li>
            </div>

        )
    };
}

export default class DevTwoSayHello extends Component{
    render(){
        return(
            <h1>hello</h1>
        )
    };
}

export default class DevOneWeekTable extends Component{


    constructor(){
        super(...arguments);
        this.state = {
            name:[]
        };
    }

    componentDidMount(){
        let testName = [
            {
                id : 1,
                title : "Read the React"
            },
            {
                id : 2,
                title : "Test Sung In"
            },
        ];
        this.setState({
            name : testName
        });

    }

    render(){
        let Name =  this.state.name.map((names)=>{
            console.log(names);
            return <DevTr id ={names.id} title = {names.title} />
        })
      return(
          <table>
              <tbody>
                  <tr>
                    <td>1111</td>
                  </tr>
                 {Name}
              </tbody>
          </table>
      );
    };
}


render((
    <Router>
        <Route path="/" component={DevTwoWeekRouter}>
            <Route path="DevOne" component={DevOneWeekTable} />
            <Route path="DevTwo" component={DevTwoSayHello} />
        </Route>
    </Router>
), document.getElementById('root'));