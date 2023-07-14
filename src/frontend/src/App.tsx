import { useRoutes, useLocation } from 'react-router-dom'
import { routers } from './router'
import { useState, useEffect, startTransition, Suspense } from 'react'
import { PageWraper } from './assets/style'
import { SnackbarProvider } from 'notistack'
import "./App.css"

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    startTransition(() => {
      setDisplayLocation(location)
    })
  }, [location])

  const element = useRoutes(routers, displayLocation)

  return (
    <PageWraper>
      <SnackbarProvider>
        <Suspense fallback={<div></div>}>
          {element}
        </Suspense>
      </SnackbarProvider>
    </PageWraper>
  )
}

export default App
