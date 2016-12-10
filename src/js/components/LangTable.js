import React from 'react'
import axios from 'axios'
import data from './toplang-2016-12.json'
import TableStyles from './LangTable.styl';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

export default class LangTable extends React.Component {

    constructor() {
        super()
        this.options = {
            defaultSortName: 'count',
            defaultSortOrder: 'asc'
        };
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get(data).then(d => {
            const langranking = _.chain(d.data)
            .split('\n')
            .map(JSON.parse)
            .take(50)
            .map((o, i) => _.assign(o, {id: ++i}))
            .value()
            this.setState({data: langranking});
        })
    }

    render() {
        return (
            <BootstrapTable
                condensed
                // pagination
                tableStyle={ { margin: '0 auto', marginBottom: '0px', width: '50%' } }
                data={this.state.data}
                bordered={false}
                options={this.options}>
                <TableHeaderColumn
                    width='150'
                    dataAlign="center"
                    dataField='id'
                    isKey={true}
                    dataSort>
                    # Ranking
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField='language_name'
                    dataSort>
                    Programming Language
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }

}