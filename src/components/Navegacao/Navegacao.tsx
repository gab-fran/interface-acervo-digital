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
                icon: 'pi pi-users',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-book',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-calendar-clock',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/emprestimos"
            },
            // Itens extras para mobile (ocultos em desktop)
            {
                separator: true,
                className: 'md:hidden'
            },
            {
                label: username,
                icon: 'pi pi-user',
                className: 'md:hidden text-white',
                template: () => (
                    <div className="flex items-center gap-3 p-3 md:hidden">
                        <Avatar image={avatarImage} shape="circle" />
                        <div className="flex flex-col">
                            <span className="text-white font-bold">{username}</span>
                            <span className="text-white text-xs opacity-60">{email}</span>
                        </div>
                    </div>
                )
            },
            {
                label: 'Sair',
                icon: 'pi pi-sign-out',
                className: 'md:hidden text-red-400 font-bold',
                command: logout
            }
        ] : [
            {
                label: 'Login',
                icon: 'pi pi-sign-in',
                className: 'md:hidden text-white font-bold',
                url: '/login'
            }
        ])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6"
        />
    );

    const userActions = (
        <div className="hidden md:flex items-center justify-end gap-2 md:gap-4">
            {isAuthenticated ? (
                <>
                    <div className="flex flex-col pr-2 md:pr-3">
                        <p className="text-white font-semibold m-0 text-sm md:text-base leading-tight">{username}</p>
                        <p className="text-white text-[10px] md:text-xs m-0 opacity-80">{email}</p>
                    </div>
                    <Avatar
                        image={avatarImage}
                        shape="circle"
                        className="!w-8 !h-8 md:!w-10 md:!h-10"
                    />
                    <button
                        className="bg-slate-600/50 ml-2 md:ml-4 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg border border-white/10 cursor-pointer flex items-center justify-center gap-2 hover:bg-red-600/80 transition-all active:scale-95 text-xs md:text-sm font-semibold shadow-sm"
                        onClick={logout}
                    >
                        <i className="pi pi-sign-out"></i>
                        <span>Sair</span>
                    </button>
                </>
            ) : (
                <button
                    className="bg-blue-600 font-bold text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 hover:bg-blue-500 shadow-md transition-all active:scale-95 text-xs md:text-sm"
                    onClick={() => navigate('/login')}
                >
                    <i className="pi pi-sign-in"></i>
                    <span>Login</span>
                </button>
            )}
        </div>
    );

    return (
        <header className="bg-slate-700 shadow-lg sticky top-0 z-50 px-2">
            <div className="max-w-[100rem] mx-auto">
                <Menubar
                    model={items}
                    start={start}
                    end={userActions}
                    // A classe abaixo garante que o PrimeReact aplique o estilo de menu mobile corretamente
                    className="!bg-transparent !border-none !py-2"
                />
            </div>

            <style>{`
                /* Garante que o ícone de três risquinhos seja branco e visível */
                .p-menubar-button {
                    color: white !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                }

                /* Estilo para os itens do menu (Alunos, Livros, etc) */
                .p-menuitem-link {
                    padding: 0.5rem 1rem !important;
                    border-radius: 8px !important;
                    transition: all 0.3s ease !important;
                }

                .p-menuitem-link:hover, .p-menuitem-content:hover {
                    background: rgba(255, 255, 255, 0.05) !important;
                }

                .p-menuitem-text, .p-menuitem-icon {
                    color: #ffffff !important;
                    font-weight: 500 !important;
                }

                .p-menuitem-icon {
                    margin-right: 0.5rem !important;
                }

                .p-menuitem-link:hover .p-menuitem-text, 
                .p-menuitem-link:hover .p-menuitem-icon {
                    color: #ffffff !important;
                    opacity: 0.8 !important;
                }
                
                /* Esconde os itens de menu em telas menores que o breakpoint */
                @media screen and (max-width: 960px) {
                    .p-menubar-root-list {
                        display: none;
                    }
                    .p-menubar-mobile-active .p-menubar-root-list {
                        display: flex !important;
                        flex-direction: column;
                        background: #334155 !important;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        padding: 1rem;
                        z-index: 1000;
                        border-bottom: 4px solid #1e293b;
                    }
                }
            `}</style>
        </header>
    );
}

export default Navegacao;
