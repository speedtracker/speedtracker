<img src="http://dadi.tech/public/assets/svg/dadi-logo-colour3.svg" width="200">

# Parts

> A foundation for front-end projects

## Table of contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
  - [Components](#components)
  - [Utilities](#utilities)
  - [Tools](#tools)
  - [Generic](#generic)
  - [Settings](#settings)

---

## Introduction

DADI Parts is a CSS framework and a set of guidelines to kickstart a new front-end project. It draws inspiration from key references in the industry, such as Harry Robert's [inuitcss](https://github.com/inuitcss) and [Airbnb's CSS/Sass Styleguide](https://github.com/airbnb/css).

It's built on three core principles:

- **Modularity**: Approach UIs as a group of modular, self-contained and reusable components as opposed to monolithic pages
- **Separation of concerns**: A front-end component is typically made up of markup (HTML), styling (CSS) and functionality (JavaScript), and it must be built in such a way that allows any of those parts to change (or be removed) without that affecting the others
- **Self-explanation**: Developers should be able to clearly understand the behaviour of a component and all the forces acting on it without requiring any previous exposure to the project or understanding of its inner workings. The structure of the project should give new developers a high level of confidence when commiting changes or new features, providing mechanisms to reduce the risk of unwanted side effects <-- needs review

## Installation

1. Install via npm

   ```shell
   npm install @dadi/parts --save
   ```

1. Create a `components` folder in your project's Sass directory

1. Grab a [sample config file](_config.scss.sample), copy it to your project and start editing the settings

1. Create a loader file where you'll load the config file, the DADI Parts core, the components and any other third-party library you wish to use

  ```scss
  // Load config
  @import 'config';
  
  // Load core
  @import '../path/to/node_modules/@dadi/parts/main';
  
  // Load components
  @import 'components/components.button.scss';
  ```

## Usage

Styles are applied against DOM elements that are targeted using classes and **never** IDs or tags. This ensures that the HTML markup,which conveys semantics, stays completely decoupled from CSS, which is purely visual. For example, you should be able to create a *button* component that can work as a `<a>`, `<button>` or `<input>` without that affecting its appearance.

Classes are named using the [BEM naming convention](https://en.bem.info). Additionally, and for the sake of transparency and self-explanation, they must be prefixed with a namespace to clearly indicate what the class is for, why it exists and how safe it is to change it without that causing unwanted effects. [[Ref]](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

The framework is formed of five different types of elements, each within they own directory:

### Components

The building blocks of our UIs. They must be modular, reusable and self-contained. They are specific to each project, so the `components` directory is not packaged with Parts and must be placed within the project.

Component classes are prefixed with `c-`.

*Example:*
```scss
.c-article {}
.c-article__title {}
.c-article__body {}
.c-article__body--with-video {}
```

### Utilities

Single responsibility rules to achieve very specific tasks when a component is not possible or practical. These **should be avoided** when possible, as relying too much on utility classes harms consistency and breaks the premise of self-contained UI components.

> *They do one thing in a very heavy-handed and inelegant way. They are to be used as a last resort when no other CSS hooks are available, or to tackle completely unique circumstances, e.g. using .u-text-center to centrally align one piece of text once and once only. They are only one step away from inline styles, so should be used sparingly.* [(source)](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

Utility classes are prefixed with `u-`.

*Example:*
```scss
.u-padding-top {}
.u-margin {}
```

### Tools

Helper functions/mixins to perform general tasks. Tools do not expose any classes, and it's common for utility classes to utilise them.

Both mixins and functions are prefixed with `dp-`.

*Example:*
```scss
.c-some-component {
  @include dp-clearfix;
  @include dp-wrapper(1200px);
 
  font-size: dp-size('large');
}
```
  
### Generic

Collection of rules to provide a consistent behaviour across different browsers (e.g. reset and normalise, box sizing). These affect projects globally and shouldn't be changed unless there's a very strong reason to do it.
  
### Settings

Configuration files. They exist both in the library core (setting the defaults) and on the project directories (customising the project). They configure things like font sizes and families, colours and spacing.
