import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[]
    }
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  generateDOM = () => {
    return _.map(this.state.widgets, (l, i) => {
      let option = l.type;
      let component = (
        <div>{option}</div>
      )
      return (
        <div key={l.i} data-grid={l}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };

  addChart(type) {
    const addItem = {
      x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
    };
    this.setState(
      {
        widgets: this.state.widgets.concat({
          ...addItem,
          type,
        }),
      },
    );
  };

  onRemoveItem(i) {
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item,index) => index !=i)
    });

  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
   return(
     <div>
      <div style={{ position: 'fixed', zIndex: 1, width: '100%','padding': '0 30px' }}>
        <button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'bar')}>???????????????</button>
        <button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'line')}>???????????????</button>
        <button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'pie')}>????????????</button>
      </div>
      <div style={{ marginTop: 44 }}>
        <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
          <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </div>
   )
}
}