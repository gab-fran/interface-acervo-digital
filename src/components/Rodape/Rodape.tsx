import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="bg-slate-800 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6">
            <div className="flex flex-col items-center md:items-start gap-1">
                <p className="text-white text-sm font-bold tracking-tight">
                    Acervo Digital
                </p>
                <p className="text-slate-400 text-xs font-medium">
                    Copyright © 2026 - Todos os direitos reservados
                </p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-slate-300 text-sm font-semibold italic">
                    Desenvolvido por <span className="text-blue-400 not-italic">Gabriel Henrique Francisco</span>
                </p>
            </div>
        </footer>
    );
}

export default Rodape;