/*global chrome*/
import React from 'react'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.hotTableComponent = React.createRef()
    this.hotSettings = {
      startRows: 6,
      startCols: 5,
      licenseKey: 'non-commercial-and-evaluation',
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true,
      formulas: true,
      dropdownMenu: {
        callback: this.storeData.bind(this),
        items: {
          col_left: {},
          col_right: {},
          separator: Handsontable.plugins.ContextMenu.SEPARATOR,
          remove_col: {},
          clear_column: {}
        }
      },
      contextMenu: {
        callback: this.storeData.bind(this),
        items: {
          row_below: {},
          remove_row: {}
        }
      }
    }
  }

  componentDidMount() {
    this.hotTableComponent.current.hotInstance.updateSettings({ afterChange: this.storeData.bind(this) })
    if (localStorage.hasOwnProperty('nimbusTable')) {
      let nimbusTable = localStorage.getItem('nimbusTable')
      this.hotTableComponent.current.hotInstance.loadData(JSON.parse(nimbusTable))
    }
  }

  storeData(change, source) {
    if (source === 'loadData') {
      return //don't save this change
    }
    const nimbusTable = JSON.stringify(this.hotTableComponent.current.hotInstance.getData())
    localStorage.setItem('nimbusTable', nimbusTable)
  }

  render() {
    return (
      <div>
        <HotTable ref={this.hotTableComponent} id="hot" settings={this.hotSettings} />
      </div>
    )
  }
}
