import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import ListagemEmprestimo from "../../../components/Listagem/ListagemEmprestimo/ListagemEmprestimo";

function PListaEmprestimo(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemEmprestimo />
            <Rodape />
        </>
    )
}

export default PListaEmprestimo;