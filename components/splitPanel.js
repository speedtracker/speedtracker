export default ({children}) => (
  <div className="wrapper">
    {children.map((child, index) => (
      <div
        className="column"
        key={index}
      >{child}</div>
    ))}

    <style jsx>{`
      .wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      .column {
        padding: 15px;
        width: ${100 / children.length}%;
      }

      @media (max-width: 600px) {
        .column {
          width: 100%;
        }
      }
    `}</style>
  </div>
)