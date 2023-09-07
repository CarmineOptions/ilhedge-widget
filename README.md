# Carmine ILHedge Widget

DISCLAIMER: This is still a work in progress, please do not use it int production YET.

Carmine ILHedge Widget allows users to protect themselves from Impremanent Loss. Read more about [Hedging Impermanent Loss](https://medium.com/@carminefinanceinfo/hedging-impermanent-loss-part-1-52c51846f3da).

## Getting started

Carmine ILHedge Widget can be easily implemented as a React component.

First install the `carmine-ilhedge-widget` [npm package]() which contains the React component.

Install the widget via `npm` or `yarn`.

```js
yarn add carmine-ilhedge-widget
```

```js
npm i --save carmine-ilhedge-widget
```

After installing, embed the React component in your application.

```tsx
import ReactDOM from "react-dom";
import { AccountInterface } from "starknet";
import { CarmineILHedgeWidget } from "carmine-ilhedge-widget";

function App() {
  const [account, setAccount] = useState<AccountInterface | undefined>();
  // all root variables are valid parent
  const root = document.getElementById("my-app");
  const root1 = "my-app";
  const root2 = "#my-app";

  return (
    <CarmineILHedgeWidget
      // optional
      account={account}
      parent={root}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("my-app"));
```

Providing _starknet account_ is optional, if it is not provided, user will be prompted to connect their wallet from the Widget.

Property _parent_ should be provided, this is the element on top of which the modal will appear. Allowed values are

- `string` - either CSS selector or id of the element
- `HTMLElement` - reference to the DOM element
- `undefined` - if nothing is provided, the fallback value is `document.body`

To open the Widget, emit custom event `CARMINE_ILHEDGE_OPEN`. This is a simple implementation of a button that opens the Widget:

```tsx
function OpenWidgetButton() {
  const handleClick = () =>
    window.dispatchEvent(new Event("CARMINE_ILHEDGE_OPEN"));

  return <button onClick={handleClick}>Hedge Impermanent Loss</button>;
}

export { OpenWidgetButton };
```

TODO: add more instructions and images

## Documentation

TODO: add link to documentation
