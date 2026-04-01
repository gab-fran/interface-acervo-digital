import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormAtualizarLivro from "../../../components/Formularios/FormAtualizarLivro/FormAtualizarLivro";

function PAtualizarLivro(): JSX.Element {
    return (
        <>
            <Navegacao />
            <FormAtualizarLivro />
            <Rodape />
        </>
    );
}

export default PAtualizarLivro;
