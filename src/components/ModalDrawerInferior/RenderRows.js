import Row from './Row.js'

export function RenderRows(props) {
    const numRows = props.numRows; 
    
	for (let i = 0; i < numRows; i++) { 
		return(
			<Row/>
		)
	}
}
