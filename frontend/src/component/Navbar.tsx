import React from 'react'
import { Sun, Moon } from 'lucide-react'


const Navbar = () => {
    const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        const theme = e.target.checked ? "dark" : "light"
        document.documentElement.setAttribute("data-theme", theme)
    }
    return (
        <div className='bg-base-200 flex py-4 px-10 justify-between items-center'>
            <div className="text-3xl font-bold tracking-tight">Chat Room</div>
            <div className="btn btn-primary">
                <label className='swap swap-rotate'>
                    <input type="checkbox" onChange={toggleTheme} />
                    <Sun className='swap-off size-8' />
                    <Moon className='swap-on size-8' />
                </label>
            </div>
        </div>
    )
}

export default Navbar