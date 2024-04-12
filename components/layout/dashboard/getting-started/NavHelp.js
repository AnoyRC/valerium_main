const NavHelp = ({title, children})=>{
    return <div className="flex-1 bg-gradient-light-linear/85 border border-sollid
    border-border-light p-8 first-of-type:mr-8 rounded-xl">
        <h2 className="font-gloock text-3xl">{title}</h2>
        <ul className="mt-3">
            {children}
        </ul>
    </div>
}

export default NavHelp;