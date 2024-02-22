### What is the difference between Component and PureComponent? Give an example where it might break my app.

**Pure components** do a shallow comparison of its props with its previous values to define if they should re-render. It's like a built in `componentShouldUpdate` function that compares the previos props with the new props, if they are the same, the components does not re-render.

One possible problem with that is that by doing a shallow comparison, if you pass a object as props, the component will always be re-rendered.

This happens because JS does a comparison by reference instead of a deep comparison on objects and every time that the parent component is rendered, a new object is created.

This would be a good example of using a Pure component:

```jsx
class Counter extends Component = () => {
  state = {
    count: 0
  }

  render() {
    <div>
      {this.state.counter}
      <button
        onClick={() => this.setState(this.state.counter + 1)}>
        Increase counter
      </button>
      <MyPureComponent name="Diego" /> // <- This wont re-render because the name props dont change even if the states change
    </div>
  }
};

class MyPureComponent extends PureComponent {
  render() {
    // ...
  }
}
```

This other example shows how it coul be a problem to use pure component without using a primitive value as props:

```jsx
class Counter extends Component = () => {
  state = {
    count: 0
  }

  render() {
    <div>
      {this.state.counter}
      <button
        onClick={() => this.setState(this.state.counter + 1)}>
        Increase counter
      </button>
      <MyPureComponent user={{name : "Diego", age: 33}} /> // <- This will re-render every time, because of the shallow comparison with the user props
    </div>
  }
};

class MyPureComponent extends PureComponent {
  render() {
    // ...
  }
}
```

---

### Context + ShouldComponentUpdate might be dangerous. Why is that?

When you use a `shouldComponentUpdate` method, generally you are trying to improve performance of you application by reducing uneeded re-renderers. But when a context updates, it bypass the `shouldComponentUpdate` method and forces a re-renderer of the component.
This can cause unexpected behaviors of your component and its children and also can make the debugging of the application much more complex

---

### Describe 3 ways to pass information from a component to its PARENT.

The most common way is using a callback function that the child component can call. The child component receives a callback function by props an call it. When the callback funcion is called, the child component can call with a parameter and share data this way.

Other way would be using the context API, so both the child and parent component would read the data of a shared source. The child component could alter this data as needed and the parent will be able to interact with the changed data.

I am not sure if it counts, but if you lift the state to a parent component of both components, you can use the same approach as the first one that I explained to share data between parent and child component

---

### Give 2 ways to prevent components from re-rendering.

You can use a Pure component as described on the first question to prevent components of rendering.

If you are using a class component, you can use the `shouldComponentUpdate` lifecycle method to define a rule to prevent this from happening or if you are using a more modern react with hooks approach, you can use `React.memo()` to memoize the component and prevent it from rendering.

---

### What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a wrapper element that allows you to group a list of children without adding an extra HTML element to the actual DOM. You use it when you want to return multiple childs on a component but don't want to add more tags to the DOM.

Maybe an example of breaking the aplication is if you try to put style on a Fragment, it won't work an can cause problems to your application.

---

### Give 3 examples of the HOC pattern.

Higher-Order Components are a patter to reuse code and logic. Some examples are:

Authentication:

```jsx
const withAuth = (WrappedComponent) => {
  const auth = useAuth() // Any logic of auth here, could be a coginito, auth0, etc...

  return (props) => {
    if (!auth.isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return <WrappedComponent {...props} />
  }
}

const ProtectedComponent = withAuth(MyComponent)
```

Share commom fetching logic

```jsx
const withDataFetching = (fetchData) => (Component) => {
  const WrappedComponent = (props) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchDataAsync = async () => {
        setLoading(true)
        const response = await fetchData()
        setData(response.data)
        setLoading(false)
      }
      fetchDataAsync()
    }, [])

    return loading ? <p>Loading...</p> : <Component {...props} data={data} />
  }

  return WrappedComponent
}

const MyComponent = ({ data }) => {
  // Render data here
}

const MyDataFetchedComponent = withDataFetching(fetchPosts)(MyComponent)
```

Apply commom styles

```jsx
import React from 'react'

const withStyling = (Component) => {
  const StylingComponent = (props) => {
    const { primary } = props
    const className = primary ? 'primary' : 'secondary'
    return <Component {...props} className={className} />
  }

  return StylingComponent
}

export default withStyling
```

---

### What's the difference in handling exceptions in promises, callbacks and async…await?

Using async await helps to improve the readbility of the code. The difference is the way you write a more linear code, for examplo:

instead of using callbacks that can lead you to a [callback hell](https://medium.com/@avinashkumar151199/what-is-callback-hell-a4594574e3c7) to treat all the errors like this:

```javascript
fetch('https://example.com/api/data')
  .then((response) => response.json())
  .then((data) => {
    fetch(`https://example.com/api/data${data.id}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching data:', error)
        // Handle the error here
      })
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
    // Handle the error here
  })
```

You could use a `try...catch` approach with async await this way:

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://example.com/api/data')
    const data = await response.json()
    const otherResponse = await fetch(`https://example.com/api/data${data.id}`)
    const otherData = await otherResponse.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    // Handle the error here
  }
}
```

---

### How many arguments does setState take and why is it async.

`setState` can receive 2 arguments, the first one is mandatory and it is the or an object with the new state or a function that receives the prev state and returns a new one.

The second argument is an optional callback function that will be executed after the state update has been applied and the component has been re-rendered.

It is async because of how the react reconciliation algorithm works, it batches varios `setState` calls to optimize the rendering and improve react performance.

---

### List the steps needed to migrate a Class to Function Component.

1. Remove the class keywork and change the component to a functional one.
2. Replace state with useState.
3. Replace lifecycle methods with useEffect.
4. Remove references to this.
4. Alter access to props using destructuringon functional component's argument list.
5. Convert event handlers and methods to regular functions.
6. Remove the render method and add a return instead.
7. Test and Debug.

---

### List a few ways styles can be used with components.

Inline style:
```jsx
const MyComponent = () => (
  <div style={{ color: 'red' }}>Hello World!</div>
);
```

Css modules:
```jsx
// styles.module.css
.wrapper {
  color: red;
}

// MyComponent.js
import styles from './styles.module.css';

const MyComponent = () => (
  <div className={styles.wrapper}>Hello World!</div>
);
```

Styled components:
```jsx
import styled from 'styled-components';

const MyStyledComponent = styled.div`
  color: red;
`;

const MyComponent = () => (
  <MyStyledComponent>Hello World!</MyStyledComponent>
);
```

Tailwind CSS:
```jsx
const MyComponent = () => (
  <div className='text-red-700'>Hello World!</div>
);
```

---

### How to render an HTML string coming from the server.

It could be an security issue and should be avoided. React has a `dangerouslySetInnerHTML` prop that allow you do that.
Other ways of doing it would be using an external lib like `react-html-parser` for that. This way you rely on the library implementation to grant the security of your application.
