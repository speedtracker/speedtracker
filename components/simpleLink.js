import Link from 'next/link'

export default ({accent = 'primary', as, href, children, size}) => (
  <Link as={as} href={href}>
    <a className="link">
      {children}

      <style jsx>{`
        .link {
          border-color: ${accent === 'primary' ? '#00000054' : '#ffffff94'};
          border-style: solid;
          border-width: 0 0 1px 0;
          color: ${accent === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'};
          cursor: pointer;
          font-family: var(--font-family-primary);
          display: inline-block;
          transition: border-color 0.15s ease-in-out;

          ${size === 'large' && `
            font-size: var(--font-size-large);
          `}
        }

        .link:hover {
          border-color: ${accent === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'};
        }
      `}</style>
    </a>
  </Link>
)