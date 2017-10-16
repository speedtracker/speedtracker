<img src="https://speedtracker.org/assets/images/logo-full-square-inverted.png" width="300">

# Front-end
[![Backers on Open Collective](https://opencollective.com/speedtracker/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/speedtracker/sponsors/badge.svg)](#sponsors) 
> v1.2.3

*Visualisation layer and data store for SpeedTracker*

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Installation

1. [Click here](https://www.webpagetest.org/getkey.php) to request a WebPageTest API key.
1. Fork this repository into your own GitHub account or organisation.
1. Enable GitHub Pages for the repository under *Settings* > *Options* > *GitHub Pages*. Select the branch you want to serve your site from (typically **master**).
1. Add **speedtracker-bot** as a collaborator on your repository (under *Settings* > *Collaborators*).
1. Use the [connect tool](https://speedtracker.org/connect) to establish a connection between SpeedTracker and your repository.
1. Edit the main configuration file (`speedtracker.yml`).
1. Edit `_profiles/default.html` to define your first profile.
1. Commit and push the changed files.
1. Use the [test tool](https://speedtracker.org/test) to run a test.

## Development

1. Install dependencies

  ```
  npm install
  ```

1. Start the Jekyll server

  ```
  jekyll serve --watch --port SOME_PORT
  ```

1. Start Webpack

  ```
  npm run watch
  ```

1. When you're done with your changes, build the bundle for production

  ```
  npm run build
  ```

---

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/speedtracker/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/speedtracker#backer)]

<a href="https://opencollective.com/speedtracker#backers" target="_blank"><img src="https://opencollective.com/speedtracker/backers.svg?width=890"></a>


## Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/speedtracker#sponsor))

<a href="https://opencollective.com/speedtracker/sponsor/0/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/1/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/2/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/3/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/4/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/5/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/6/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/7/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/8/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/speedtracker/sponsor/9/website" target="_blank"><img src="https://opencollective.com/speedtracker/sponsor/9/avatar.svg"></a>



## License

This project is licensed under the MIT license:

The MIT License (MIT)

Copyright (c) 2016 Eduardo Bouças

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
