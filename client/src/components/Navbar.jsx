import {HiMenuAlt4} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai";
import logo from "../../images/logo.png"
import {useState} from "react";


// NavBarItem Components

const NavBarItem = ({title, classProps}) => {
    return (
        <li className={
            `mx-4 cursor-pointer ${classProps}`
        }>
            {title} </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (

        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex[0.5] flex-initial justify-center items-center">
                <img src={logo}
                    className="w-32 cursor-pointer"/>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {
                ["Market", "Tutorials", "Wallet", "Account"].map((item, index) => (
                    <NavBarItem key={
                            item + index
                        }
                        title={item}/>
                ))
            }
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-md cursor-pointer hover:bg[#2546bd]">Login</li>
            </ul>
            <div className="flex relative">
                {
                toggleMenu ? <AiOutlineClose fontSize={28}
                    className="text-white md:hidden cursor-pointer"
                    onClick={
                        () => setToggleMenu(false)
                    }/> : <HiMenuAlt4 fontSize={28}
                    className="text-white md:hidden cursor-pointer"
                    onClick={
                        () => setToggleMenu(true)
                    }/>
            }

                {
                toggleMenu && (
                    <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col items-end rounded-md justify-start blue-glassmorphism text-white animate-pulse">
                        <li className="w-full my-2 text-xl">
                            <AiOutlineClose onClick={
                                () => setToggleMenu(false)
                            }/>
                        </li>

                        {
                        ["Market", "Tutorials", "Wallet", "Account"].map((item, index) => (
                            <NavBarItem key={
                                    item + index
                                }
                                title={item} classProps="my-2 text-lg "/>
                        ))
                    } </ul>
                )
            } </div>
        </nav>
    )
}

export default Navbar
