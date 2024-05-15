interface PropTypes {
  cellContext: any
}

export const QuoteNumberColumn = ({cellContext}: PropTypes) => {
  
  return (
    <div className="flex justify-center">
      {cellContext.renderValue()}
    </div>
  )
}