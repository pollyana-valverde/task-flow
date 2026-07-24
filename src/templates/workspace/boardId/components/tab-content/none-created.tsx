import {
  NoneCreated,
  NoneCreatedContent,
  NoneCreatedSubtitle,
  NoneCreatedTitle
} from "@/components/ui/none-created";

async function NoneColumnCreated() {
  return (
    <NoneCreated className="md:w-screen md:m-auto">
      <NoneCreatedContent>
        <NoneCreatedTitle>Board vazio</NoneCreatedTitle>
        <NoneCreatedSubtitle>Nenhuma coluna criada ainda.</NoneCreatedSubtitle>
      </NoneCreatedContent>
    </NoneCreated>
  );
}

export { NoneColumnCreated };
