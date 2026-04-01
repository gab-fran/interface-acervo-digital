import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import ListagemLivro from "../../../components/Listagem/ListagemLivro/ListagemLivro";

function PListaLivro(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemLivro />
            <Rodape />
        </>
    )
}

export default PListaLivro;