import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#111d20]">
          <h1 className="text-9xl font-extrabold text-white tracking-widest">
            404
          </h1>
          <div className="bg-[#ee6868] px-2 text-sm font-medium rounded rotate-12 absolute">
            Page Not Found
          </div>
        </main>
      )
    }

    // Return children components in case of no error

    // @ts-ignore
    return this.props.children
  }
}
