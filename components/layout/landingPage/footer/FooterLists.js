import Link from "next/link";

const FooterLists = ({ heading, lists }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-base text-text-gray font-noto">{heading}</h3>

      <ul className="space-y-4">
        {lists.map((list, index) => (
          <li key={index} className="text-base text-black font-noto">
            <Link href={list.link}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLists;
