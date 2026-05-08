import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    // criando estado para controlar a renderização condicional
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    
    const navigate = useNavigate();

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    }

    const username = localStorage.getItem('username') ?? 'Usuário';
    const email = localStorage.getItem('email') ?? '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-white text-xs sm:text-sm md:text-base lg:text-lg',
            url: "/"
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-star',
                className: 'mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-white text-xs sm:text-sm md:text-base lg:text-lg',
                url: "/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-star',
                className: 'mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-white text-xs sm:text-sm md:text-base lg:text-lg',
                url: "/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-star',
                className: 'mx-1 sm:mx-2 md:mx-3 lg:mx-4 text-white text-xs sm:text-sm md:text-base lg:text-lg',
                url: "/emprestimos"   
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto ml-1 sm:ml-2 md:ml-4 lg:ml-6"
        />
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end mr-2 sm:mr-4 md:mr-6 lg:mr-10 gap-1 sm:gap-2 md:gap-4">
            {/* Informações do usuário - escondidas em telas muito pequenas */}
            <div className="flex flex-col pr-1 sm:pr-2 md:pr-3 hidden md:flex">
                <p className="text-white font-semibold m-0 text-xs sm:text-sm md:text-base truncate max-w-[120px] lg:max-w-none">{username}</p>
                <p className="text-white text-xs sm:text-sm m-0 truncate max-w-[120px] lg:max-w-none">{email}</p>
            </div>
            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-7 !h-7 sm:!w-8 sm:!h-8 md:!w-10 md:!h-10"
            />
            <button
                className="bg-white ml-1 sm:ml-2 md:ml-4 text-slate-700 px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs sm:text-sm min-h-[44px] sm:min-h-auto"
                onClick={logout}
                aria-label="Sair"
            >
                <i className="pi pi-sign-out"></i>
                <span className="hidden sm:inline">Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white font-bold text-slate-700 px-2 sm:px-3 md:px-5 py-1.5 sm:py-2 mr-2 sm:mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs sm:text-sm min-h-[44px] sm:min-h-auto"
            onClick={() => navigate('/login')}
            aria-label="Fazer Login"
        >
            <i className="pi pi-sign-in"></i>
            <span className="hidden sm:inline">Login</span>
        </button>
    );

    return (
        <header className="card bg-slate-700 flex items-center px-1 sm:px-2 md:px-4 py-2 sm:py-3 min-h-[56px] sm:min-h-[64px]">
            <div className="flex-1 min-w-0">
                <Menubar 
                    model={items} 
                    start={start}
                    className="border-0 bg-transparent"
                />
            </div>
            {userActions}
        </header>
    );
}

export default Navegacao;