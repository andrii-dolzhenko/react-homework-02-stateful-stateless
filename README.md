# TaskFlow

A responsive daily task manager created to demonstrate stateful, stateless, functional, and class components in React.

## Features

- a stateful component manages tasks, input, validation, and profile popup state;
- a stateless component receives tasks and event handlers through props;
- matching functional and class components demonstrate two approaches to displaying the current date;
- tasks can be added with the button or Enter key;
- tasks can be marked as active or completed;
- tasks can be deleted;
- task statistics are calculated automatically;
- an empty state helps users start a new task;
- input validation and accessible control states are included;
- the layout adapts to desktop, tablet, and mobile screens.

## Technologies

- React;
- Vite;
- JavaScript;
- CSS;
- Oxlint.

## Installation

```bash
git clone https://github.com/andrii-dolzhenko/react-homework-02-stateful-stateless.git
cd react-homework-02-stateful-stateless
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Component Structure

```text
App
└── StatefulTaskManager
    ├── ClassCurrentDate
    └── StatelessTaskList
```

`StatefulTaskManager` stores and updates application state with `useState`. `StatelessTaskList` has no local state: it displays data and invokes callbacks received through props.

The optional assignment is implemented with two components that provide the same functionality:

```text
FunctionalCurrentDate — useState + useEffect
ClassCurrentDate      — state + componentDidMount + componentWillUnmount
```

`ClassCurrentDate` is rendered in the header. `FunctionalCurrentDate` remains in the source as a direct functional reference for comparing the two approaches.

## Functional and Class Components

| Aspect      | Functional approach                                         | Class approach                                                                |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Development | Requires less boilerplate and uses hooks                    | Requires `extends Component`, `render()`, and `this`                          |
| Readability | Keeps the logic concise and directly inside the function    | Provides an explicit structure but requires more code                         |
| State       | `useState` returns the value and its update function        | State is stored in `this.state` and updated with `this.setState()`            |
| Lifecycle   | `useEffect` starts the timer and returns a cleanup function | `componentDidMount()` starts the timer and `componentWillUnmount()` clears it |

TaskFlow uses modern functional components for its main application logic. The paired date components reproduce the same behavior, making their syntax, state management, and lifecycle differences directly comparable in the source code.

## Live Demo

[View TaskFlow on Vercel](https://react-homework-02-stateful-stateles.vercel.app/)

## Author

Andrii Dolzhenko
