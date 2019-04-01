export default ({
  error,
  onChange,
  placeholder,
  type = 'text',
  value
}) => (
  <>
    <input
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value || ''}
    />

    <style jsx>{`
      input {
        background: var(--color-secondary);
        border-color: transparent transparent var(--color-accent) transparent;
        border-radius: 0;
        border-style: solid;
        border-width: 4px 0 0 0;
        display: block;
        font-family: var(--font-family-primary);
        font-size: var(--font-size-large);
        font-weight: bold;
        margin: 4px 0 0 0;
        outline: 0;
        padding: 5px 10px;
        transition: border-color 0.6s ease-out;
        width: 100%;
      }

      input:focus {
        border-color: var(--color-secondary);
      }

      ::-webkit-input-placeholder {
        color: #aaa;
      }
    
      :-moz-placeholder {
        color: #aaa;  
      }
    
      ::-moz-placeholder {
        color: #aaa;  
      }
    
      :-ms-input-placeholder {  
        color: #aaa;  
      }        
    `}</style>
  </>
)