export default ({children, space, text}) => (
  <div className="info-panel">
    {children}

    <style jsx>{`
      .info-panel {
        background-color: #e8e8e8;
        font-family: var(--font-family-primary);
        line-height: 1.4;
        padding: 15px;
        width: 100%;
      }
      
      .info-panel :global(* + *) {
        margin-top: 15px;
      }

      .info-panel :global(a) {
        text-decoration: underline;
      }
    `}</style>
  </div>
)