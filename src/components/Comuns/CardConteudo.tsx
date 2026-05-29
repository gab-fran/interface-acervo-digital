import type { JSX, ReactNode } from "react";
import { cx, ui } from "./styles";

interface CardConteudoProps {
    children: ReactNode;
    className?: string;
    asForm?: boolean;
}

function CardConteudo({ children, className, asForm = false }: CardConteudoProps): JSX.Element {
    return (
        <div className={cx(asForm ? ui.formCard : ui.card, className)}>
            {children}
        </div>
    );
}

export default CardConteudo;
