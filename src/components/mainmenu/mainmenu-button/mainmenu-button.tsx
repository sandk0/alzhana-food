interface Props {
  title: string
  onClick: () => void
}

export function MainMenuButton({title, onClick}: Props) {
  return (
    <button disabled onClick={() => onClick()}>{title}</button>
  );
}