import {
  Home,
  ArrowLeftRight,
  Send,
  HandCoins,
  RefreshCcw,
  Images,
  Store,
  ShoppingBag,
  Newspaper,
  CircleHelp,
  Settings,
} from "lucide-react";

export const navItems = [
  {
    label: "Home",
    icon: Home,
    size: "lg",
    href: "/home",
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    size: "lg",
    rotate: true,
    href: "/transactions",
  },
  {
    label: "Transfer",
    icon: Send,
    size: "lg",
    href: "/transfer",
  },
  {
    label: "Deposit",
    icon: HandCoins,
    size: "lg",
    href: "/deposit",
  },
  {
    label: "Swap",
    icon: RefreshCcw,
    size: "lg",
    href: "/swap",
  },
  {
    label: "NFTs",
    icon: Images,
    size: "lg",
    href: "/nfts",
  },
  {
    label: "Market",
    icon: Store,
    size: "lg",
    href: "/market",
  },

  {
    label: "Store",
    icon: ShoppingBag,
    size: "sm",
    href: "/store",
  },
  {
    label: "News",
    icon: Newspaper,
    size: "sm",
    href: "/news",
  },
  {
    label: "Help",
    icon: CircleHelp,
    size: "sm",
    href: "/help",
  },
  {
    label: "Setting",
    icon: Settings,
    size: "sm",
    href: "/setting",
  },
];
