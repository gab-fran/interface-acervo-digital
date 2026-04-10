import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import ListagemAluno from "../../components/Listagem/ListagemAluno/ListagemAluno";

function PAlunos(): JSX.Element {
    return (
        <>
            <Navegacao/>
            <ListagemAluno />
            <Rodape />
        </>
    );
}

export default PAlunos;