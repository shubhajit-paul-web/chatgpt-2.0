import Sidebar from "./components/Sidebar"
import AppRoutes from "./routes/AppRoutes"

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <AppRoutes />
    </div>
  )
}

export default App