import { Text } from "@/components/ui/text";
import { capitalizeFirtLetter } from "@/utils/captalize-first-letter";

interface UserCardsProps {
  user: {
    createdAt: Date;
    updatedAt: Date;
  } | undefined
}

function UserCards({ user }: UserCardsProps) {
  if (!user) {
    return;
  }

  const USER_CARDS_LIST = [
    {
      id: "123",
      label: "Membro desde",
      info: user.createdAt.toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric"
      })
    },
    {
      id: "456",
      label: "Fuso",
      info: "GMT-3 · São Paulo"
    },
    {
      id: "897",
      label: "Perfil atualizado em",
      info: user.updatedAt.toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric"
      })
    },
  ]


  return (
    <div className="grid grid-cols-3 items-center gap-4">
      {USER_CARDS_LIST.map((card) => (
        <div key={card.id} className="flex flex-col gap-2 p-4.5 rounded-2xl bg-popover border">
          <Text variant="mono" className="uppercase font-semibold">{ card.label}</Text>
          <Text className="text-foreground font-semibold">{capitalizeFirtLetter(card.info)}</Text>
        </div>
      ))}
    </div>
  )
}

export { UserCards };
