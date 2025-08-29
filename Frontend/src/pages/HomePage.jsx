import PromptInput from "../components/Chat/PromptInput"

const HomePage = () => {
  return (
	  <div className="min-h-screen w-[80vw] bg-zinc-800 relative">
      <div className="absolute top-2/5 left-[50%] -translate-1/2">
        <h1 className="text-5xl font-medium text-blue-500/80">Hello, Shubhajit</h1>
      </div>

      {/* chat messages */}
      <div className="w-full h-screen px-[10vw] inset-x-0 mx-auto overflow-y-auto">
        
      </div>
      
      <PromptInput />
    </div>
  )
}

export default HomePage