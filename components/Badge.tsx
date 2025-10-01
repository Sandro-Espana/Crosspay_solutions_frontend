type Props = { label: string };
export default function Badge({ label }: Props) {
  return (
    <div className="inline-block badge-gradient text-white px-5 py-2 rounded-full text-sm font-semibold shadow-soft">
      {label}
    </div>
  );
}
