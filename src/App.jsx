import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'
import Button from './components/Button.jsx';
import axios from 'axios';
var n;
class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'No username',
      info: '',
      follower: '',
      data: [],
      testValue: '',
    }
    this.handleClick = this.handleClick.bind(this)
  }createArray(datas) {
	var values = [];
	var i;
	var array = [];
	var color = 0;
	for (i = 0; i < datas.length; i++) {
		array = array.concat({"id": datas[i].login, "value": 100, "color": "hsl(color, 70%, 50%)"});
		color = color + 2;
	}
	return array;
}handleClick(e) {
	axios.get('https://api.github.com/users/phadej')
    	.then(response => this.setState({
      	username: response.data.login,
      	info : JSON.stringify(response.data, undefined, 2)
}));
	axios.get('https://api.github.com/users/phadej/followers')
	.then(response => this.setState({
		follower: response.data,
		data: this.createArray(response.data)
}));
  }render() {
    return (
      <div className="App" style={{height: 2200, width: 1100}}>
        <header className="App-header">
          <h1 className="App-title">GitHub Analytics</h1>
        </header>
        <p className="App-intro">
          Watch this space...
        </p>
        <Button handleClick={this.handleClick}/>
        <p><b>Username:</b></p>
        <p>{this.state.username}</p>
        <b>Information:</b>
        <pre>{this.state.info}</pre>
	<b>Public repositories owned by followers of main user:</b>
	<ResponsivePie
        data={this.state.data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
      </div>
    );
  }
}export default App;

