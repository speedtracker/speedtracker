export default ({
  defaultOption,
  onChange,
  options,
  placeholder,
  value
}) => (
  <select
    className="dropdown"
    onChange={onChange}
    value={value}
  >
    {defaultOption && (
      <option value="">{defaultOption}</option>
    )}

    {Object.keys(options).map(option => (
      <option key={option} value={option}>{options[option]}</option>
    ))}

    <style jsx>{`
      .dropdown {
        -webkit-appearance: none;
        background-color: var(--color-secondary);
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTUgNmgxMGwtNSA5LTUtOXoiPjwvcGF0aD48L3N2Zz4=);
        background-origin: border-box;
        background-position: right 5px center;
        background-repeat: no-repeat;
        background-size: 20px;
        border: 0;
        border-bottom: 2px solid white;
        border-radius: 0;
        color: var(--color-primary);
        display: block;
        font-family: var(--font-family-primary);
        font-size: var(--font-size-large);
        font-weight: bold;
        margin: 4px 0 0 0;
        outline: 0;
        padding: 5px 30px 5px 10px;
        width: 100%;
      }

      .dropdown:focus {
        border-bottom-color: rgba(white, 0.5);
      }
    `}</style>
  </select>
)