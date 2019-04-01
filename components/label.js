export default ({children, error, space, text}) => (
  <label>
    {text}{error ? ` (${error})` : ''}
    {children}

    <style jsx>{`
      label {
        background-color: var(--color-accent);
        color: var(--color-secondary);
        display: inline-block;
        font-family: var(--font-family-primary);
        font-size: 14px;
        font-weight: bold;
        padding: 8px 6px 6px 6px;
        text-transform: uppercase;
        width: 100%;

        ${space && `
          margin-bottom: 30px;
        `}

        ${error && `
          background-color: var(--color-error);
        `}
      }
    `}</style>
  </label>
)