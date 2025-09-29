type Props = {
  red_social: string;
  color: string;
  icon: React.ReactNode;
  link: string | undefined;
};

export default function LinkBadge({ red_social, color, icon, link }: Props) {
  return (
    <div>
      <a
        href={link}
        className={`bg-${color}-500 rounded-lg px-5 py-3 text-${color}-100 text-white flex items-center gap-2 font-semibold`}
      >
        {icon}
        {red_social}
      </a>
    </div>
  );
}

