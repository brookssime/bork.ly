/*global chrome*/
import React from 'react'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.hotTableComponent = React.createRef()
    this.hotSettings = {
      startRows: 5,
      startCols: 5,
      licenseKey: 'non-commercial-and-evaluation',
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true,
      formulas: true,
      contextMenu: {
        items: {
          row_above: {},
          row_below: {},
          col_left: {},
          col_right: {},
          separator: Handsontable.plugins.ContextMenu.SEPARATOR,
          clear_custom: {
            name: 'Clear all cells',
            callback: function() {
              this.clear()
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.hotTableComponent.current.hotInstance.updateSettings({ afterChange: this.loadOrStoreData.bind(this) })
    chrome.storage.local.get(['nimbusTable'], function(result) {
      console.log(result)
      if (result && result.nimbusTable) {
        this.hotTableComponent.current.hotInstance.loadData(JSON.parse(result.nimbusTable))
      }
    })
  }

  loadOrStoreData(change, source) {
    if (source === 'loadData') {
      return //don't save this change
    }
    const nimbusTable = JSON.stringify(this.hotTableComponent.current.hotInstance.getData())
    chrome.storage.local.set({ nimbusTable: nimbusTable })
  }

  render() {
    return (
      <div>
        <HotTable ref={this.hotTableComponent} id="hot" settings={this.hotSettings} />
      </div>
    )
  }
}
