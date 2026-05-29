import type { JSX, ReactNode } from "react";
import { cx, ui } from "./styles";

interface PaginaConteudoProps {
    children: ReactNode;
    className?: string;
    innerClassName?: string;
    formLayout?: boolean;
}

function PaginaConteudo({ children, className, innerClassName, formLayout = false }: PaginaConteudoProps): JSX.Element {
    return (
        <main className={cx(ui.page, className)}>
            <div className={cx(formLayout ? ui.formInner : ui.pageInner, innerClassName)}>
                {children}
            </div>
        </main>
    );
}

export default PaginaConteudo;
