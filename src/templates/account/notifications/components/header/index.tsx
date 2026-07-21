import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

function Header() {
  return (
    <div className="flex justify-between gap-4 items-center">
      <Text variant="mono">4 não lidas</Text>
      <Button variant="secondary" size="sm" className="bg-popover">
        Marcar tudo como lido
      </Button>
    </div>
  )
}

export { Header }

