import { FC } from 'react'
import Register from "./Register.tsx";

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
      <nav className={'sticky h-10 w-full top-0 bg-pink-300 border border-black'}>
        
        <Register />
        
      </nav>
    )
}

export default Navbar