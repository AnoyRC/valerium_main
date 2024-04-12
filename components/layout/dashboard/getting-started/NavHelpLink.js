import Link from 'next/link'
const NavHelpLink = ({link, label, hyperlink}) =>{
    return <li className='text-xl mb-1 last-of-type:mb-0'> {label} - <Link href={hyperlink} className='text-highlight-pink underline underline-offset-1 '>{link}</Link></li>
}

export default NavHelpLink;