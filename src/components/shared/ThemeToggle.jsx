import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light' || localStorage.getItem('theme'))

    useEffect(() => {
        if (theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

  return (
    <div>
      
    </div>
  )
}

export default ThemeToggle
