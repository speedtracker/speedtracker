import Button from './button'
import Link from 'next/link'
import Logo from './logo'
import LogoTitle from './logoTitle'
import SimpleLink from './simpleLink'
import Waves from './waves'

export default ({extended, title, user}) => (
  <header className={`header ${extended ? 'header--extended' : ''}`}>
    <div className="header__wrapper">
      <div className="header__nav">
        {user
          ? (
            <>
              <Link href="/profiles">
                <a className="header__nav-link">Profiles</a>
              </Link>

              <Link href="/signout">
                <a className="header__nav-link">Sign out</a>
              </Link>
            </>
          )
          : (
            <>
              <a className="header__nav-link" href="/blog">Create an account</a>
              <a className="header__nav-link" href="/signin">Sign in</a>
            </>
          )
        }
      </div>

      {user && (
        <div className="header__user-info">
          <p>Hello, <SimpleLink accent="secondary" href="/account">{user}</SimpleLink>.</p>
        </div>
      )}
    </div>

    {extended && (
      <>
        <Logo width={200}/>
        
        <br/>
        
        <LogoTitle width={240}/>

        <p className="header__subtitle">Website performance monitoring tool</p>

        {/*<div className="header__links">
          <span className="header__link">
            <Button link="https://demo.speedtracker.org">View Demo</Button>
          </span>

          <span className="header__link">
            <Button link="/docs">Documentation</Button>
          </span>
        </div>*/}

        <Waves extended={true}/>
      </>
    )}

    {!extended && (
      <>
        <Link href="/">
          <a>
            <Logo width={100}/>

            <h1 className="header__page-title">{title}</h1>
          </a>
        </Link>

        <Waves/>
      </>
    )}
    
    <style jsx>{`
      .header {
        background-color: var(--color-accent);
        color: white;
        padding: 0 0 5% 0;
        position: relative;
        text-align: center;
      }

      .header__wrapper {
        margin: 0 auto;
        max-width: var(--main-container-width);
        padding-top: 50px;
        position: relative;
      }
      
      .header--extended {
        padding-bottom: 15%;
      }
      
      .header__nav {
        margin-top: -23px;
        margin-bottom: 34px;
      }

      .header__nav-link {
        border: 1px solid transparent;
        font-family: var(--font-family-primary);
        font-size: 13px;
        text-transform: uppercase;
        padding: 10px;
        transition: border-color 0.3s ease-out;
      }

      .header__nav-link:hover {
        border-color: var(--color-secondary);
      }

      @media (min-width: 600px) {
        .header__nav {
          margin-bottom: 0;
          margin-top: 0;
          position: absolute;
          right: 15px;
          top: 15px;
          z-index: 1000;
        }
      }
      
      .header__user-info {
        font-family: var(--font-family-primary);
        left: 15px;
        position: absolute;
        top: 15px;
      }
      
      .header__title {
        display: block;
      }
      
      .header__page-title {
        font-family: var(--font-family-primary);
        font-size: 27px;
        font-weight: bold;
        margin: 12px 0;
      }
      
      .header__subtitle {
        font-family: var(--font-family-primary);
        font-size: 18px;
        margin-top: 20px;
      }
      
      .header__links {
        margin-top: 34px;
      }
      
      .header__link + .header__link {
        margin-left: 23px;
      }
      
      .header__waves {
        bottom: -5px;
        left: 0;
        position: absolute;
      }
    `}</style>
  </header>
)