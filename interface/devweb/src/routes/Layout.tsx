import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export function Layout() {
  return (
    <>
      <NavBar />
      <main className="container pb-5">
        <Outlet />
      </main>
    </>
  )
}
