import React from 'react';
import { useState, memo } from 'react';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import '../../App.css'; 
import styled from 'styled-components';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DashBoard = (props) => {
  DashBoard.defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  const getFromLS = (key) => {
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
  const [layouts, setLayouts] = useState(getFromLS("layouts") || {});
  const [widgets, setWidgets] = useState([]);

  const saveToLS = (key, value) => {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }

  const generateDOM = () => {
    return _.map(widgets, (l, i) => {
      //let component = getData(l.type);
      let component = (
        <button>
          {"dd"}
        </button>
      )
      return (
        <div key={l.i} data-grid={l}>
          <span className='remove' onClick={onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };

  const addChart = (type) => {
    const addItem = {
      x: (widgets.length * 3) % (props.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
    };
    setWidgets(
      {
        widgets: widgets.concat({
          ...addItem,
          type,
        }),
      },
    );
  };

  const onRemoveItem = (i) => {
    console.log(widgets)
    this.setState({
      widgets: widgets.filter((item,index) => index !== i)
    });
  };

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts({ layouts });
  };

  return (
    <div id="layoutSidenav">
      <button type="primary" style={{'marginRight':'7px'}} onClick={() => addChart('search')}>search</button>
      <button type="primary" style={{'marginRight':'7px'}} onClick={() => addChart('papago')}>papago</button>
      <button type="primary" style={{'marginRight':'7px'}} onClick={() => addChart('memo')}>memo</button>
      <div>
        <ResponsiveReactGridLayout
          className="layout" 
          {...props}
          layouts={layouts}
          onLayoutChange={(layout, layouts) =>
            onLayoutChange(layout, layouts)
          }
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  )
}
const ModuleGrid = styled.div`
`
export default memo(DashBoard);