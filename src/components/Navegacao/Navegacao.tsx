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
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/"
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/emprestimos"   
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6"
        />
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end mr-4 md:mr-6 lg:mr-10 gap-2 md:gap-4">
            <div className="flex flex-col pr-2 md:pr-3 hidden sm:flex">
                <p className="text-white font-semibold m-0 text-sm md:text-base">{username}</p>
                <p className="text-white text-xs md:text-sm m-0">{email}</p>
            </div>
            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-8 !h-8 md:!w-10 md:!h-10"
            />
            <button
                className="bg-white ml-2 md:ml-4 text-slate-700 px-3 py-1.5 md:px-5 md:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                onClick={logout}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white font-bold text-slate-700 px-3 py-1.5 md:px-5 md:py-2 mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="card bg-slate-700 flex items-center px-2 md:px-4 py-3 min-h-[64px]">
            <div className="flex-1">
                <Menubar 
                    model={items} 
                    start={start} 
                />
            </div>
            {userActions}
        </header>
    );
}

export default Navegacao;