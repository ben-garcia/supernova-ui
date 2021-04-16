#### Notes

- Accessibility [best-practices-1.1](https://www.w3.org/TR/wai-aria-practices-1.1/)

  - Tabs
    - have an aria-label(description), role="tablist"
    - children should have role="tablist"
    - active tab needs aria-selected="true"
    - container that shows content needs role="tabpanel"
  - Dropdown
    - role="listbox"
    - aria-expanded="false" when options are hidden
    - children have role="option", aria-checked="true", aria-selected="true"(when selected)
  - TextInput
    - aria-hidden="true" if it has visual components like <Icon />
  - Checkbox
    - aria-checked="true" when it's checked
    - role="checkbox"
    - aria-labeledby="#id" set to another element to describe it
  - Radio
    - svg image needs role="presentation" to declare is has no semantic meaning
    - container needs aria-labeldby set to the description of each option
      - e.g description of community type(public, protected, private) in create community
    - role="radio"
    - aria-checked to let the user know about state
    - RadioGroup
      - role="radiogroup"

- Storybook

  - [controls](https://storybook.js.org/docs/react/essentials/controls)

- Rollup
  - not sure where do 'react' and 'react-dom' dependencies go
    - if I put them in 'dependencies', then I get
      'Error: Invalid hook call. Hooks can only be called inside of the body of a function component.'
    - if I put them in 'peerDependencies', then 'yarn test' and 'yarn storybook' fail
