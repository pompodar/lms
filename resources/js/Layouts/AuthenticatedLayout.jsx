import NavBar from '@/Components/NavBar';
import { useTheme } from '../context/ThemeContext'; // Ensure the path is correct

export default function Authenticated({ user, children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={theme === 'dark' ? 'darkmode body' : 'body'}>
                <NavBar user={user} />

                <main class="p-4 w-full">
                    {children}
                </main>
            </div>
    );
}