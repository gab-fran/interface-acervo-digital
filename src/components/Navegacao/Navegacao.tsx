import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import AppIcon from '../../assets/app-icon.png';
import AuthRequests from "../../fetch/AuthRequests";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const navigate = useNavigate();
    const [nomeUsuario, setNomeUsuario] = useState<string>('Convidado');
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const nome = localStorage.getItem('nome');
        const auth = localStorage.getItem('is_auth');
        if (nome) setNomeUsuario(nome);
        if (auth === 'true') setIsAuth(true);
    }, []);

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuth(false);
    };

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            command: () => navigate('/')
        }
    ];

    if (isAuth) {
        items.push(
            {
                label: 'Alunos',
                icon: 'pi pi-users',
                className: 'm-5 text-white text-lg',
                command: () => navigate('/aluno')
            },
            {
                label: 'Livros',
                icon: 'pi pi-book',
                className: 'm-5 text-white text-lg',
                command: () => navigate('/livro')
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-calendar',
                className: 'm-5 text-white text-lg',
                command: () => navigate('/emprestimo')
            }
        );
    }

    const start = (
        <img
            alt="logo"
            src={AppIcon}
            height="100"
            className="h-20 p-3 ml-10 mr-5 h-[7rem] cursor-pointer"
            onClick={() => navigate('/')}
        />
    );

    const end = (
        <div className="flex items-center gap-3 mr-8">
            {isAuth ? (
                <>
                    <p className="text-white content-center font-bold">{nomeUsuario}</p>
                    <Avatar
                        icon="pi pi-user"
                        shape="circle"
                        className="bg-primary text-white"
                    />
                    <Button
                        label="Sair"
                        icon="pi pi-sign-out"
                        className="p-button-rounded p-button-danger p-button-outlined text-white border-white hover:bg-red-500 transition-all"
                        onClick={logout}
                    />
                </>
            ) : (
                <Button
                    label="Entrar"
                    icon="pi pi-sign-in"
                    className="p-button-outlined text-white border-white hover:bg-white hover:text-slate-700 transition-all px-4"
                    onClick={() => navigate('/login')}
                />
            )}
        </div>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar
                model={items}
                start={start}
                end={end}
            />
        </header>
    );
}

export default Navegacao;