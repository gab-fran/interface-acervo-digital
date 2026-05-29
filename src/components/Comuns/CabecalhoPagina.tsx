import type { JSX, ReactNode } from "react";
import { cx, ui } from "./styles";

interface CabecalhoPaginaProps {
    titulo: string;
    subtitulo?: string;
    acao?: ReactNode;
    className?: string;
}

function CabecalhoPagina({ titulo, subtitulo, acao, className }: CabecalhoPaginaProps): JSX.Element {
    return (
        <div className={cx("flex flex-col md:flex-row items-center md:items-end justify-between mb-6 gap-4", className)}>
            <div className="hidden md:block md:w-1/4" />
            <div className="text-center flex-1">
                <h1 className={ui.pageTitle}>{titulo}</h1>
                {subtitulo && <p className={ui.pageSubtitle}>{subtitulo}</p>}
            </div>
            {acao ? (
                <div className="w-full md:w-1/4 flex justify-center md:justify-end">
                    {acao}
                </div>
            ) : (
                <div className="hidden md:block md:w-1/4" />
            )}
        </div>
    );
}

export default CabecalhoPagina;
