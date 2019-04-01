import Link from 'next/link'

export default ({accent, children, invert, link, onClick, type}) => (
  <>
    {type && (
      <button
        className="button"
        onClick={onClick}
        type={type}
      >{children}</button>
    )}

    {!type && (
      <Link href={link}>
        <a className="button">{children}</a>
      </Link>
    )}

    <style jsx>{`
      .button {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
        cursor: pointer;
        display: inline-block;
        font-family: var(--font-family-primary);
        font-size: 14px;
        font-weight: bold;
        padding: 14px;
        text-transform: uppercase;
        transition: all 0.2s ease-out;
        -webkit-appearance: none;
        -webkit-border-radius: 0;

        ${accent && `
          border-color: var(--color-accent);
          background-color: var(--color-accent);
          color: var(--color-secondary);
        `}
      }

      .button:hover {
        background-color: var(--color-secondary);
        color: var(--color-accent);

        ${accent && `
          background-color: transparent;
          color: var(--color-accent);        
        `}
      }
    `}</style>  
  </>
)