import { Button } from "@/components/ui/button"

const App = () => {
    return (
        <div className="flex flex-col gap-4">
            <span>This is a Shadcn + React boilerplate</span>
            <Button className="w-max">Test button</Button>
        </div>
    )
}

export default App